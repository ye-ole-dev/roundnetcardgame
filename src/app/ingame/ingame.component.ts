import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from '../game.service';
import { RCGCard } from '../rcg-card/rcg-card.component';
import { ActivatedRoute, Params } from '@angular/router';
import { GameStateChangedComponent } from './dialogs/game-state-changed/game-state-changed.component';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export interface IngameComponentRouteParams {
  gameId: string;
  team?: string;
}

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  cards: any[] = [];
  playedCards: any[] = [];
  myPlayedCards: any[] = [];
  discardedCards: any[] = [];
  passedCards: any[] = [];
  handCards: any[] = [];
  user: string;
  NUMBER_OF_HAND_CARDS = 7; // 5 + 2 to discard
  teamSelection: string;
  gameId: string;
  gameReady = false;
  gameReadyText: string;
  score: any;
  atk: number;
  def: number;
  atkToBeat: number;


  cardActionText: string;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.gameService.getUser();

    // Subscribtions
    this.gameService.joinedGame().subscribe((response: any) => {
      console.log(response);
    });

    this.gameService.gameReadyChanged().subscribe((response: any) => {
      this.gameReady = response.ready;
      this.gameReadyText = response.text;
    });

    this.gameService.gameStateChanged().subscribe((response: any) => {
      console.log('GameStateChanged');
      console.log(response);
      this.openDialog(response);


    });

    this.gameService.startedGame().subscribe((response: any) => {
      console.log('StartedGame');
      console.log(response);
      const cards = response.cards;
      this.drawHandCards(cards);

      this.score = { A: 0, B: 0 };
      this.atk = 0;
      this.def = 0;
      this.atkToBeat = 0;
    });

    this.gameService.startedPoint().subscribe((response: any) => {
      const cards = response.cards;
      this.drawHandCards(cards);
    });

    this.gameService.discardedCard().subscribe((response: any) => {
      const i = this.handCards.findIndex(x => x.title === response.card.title);

      this.handCards.splice(i, 1);
      this.discardedCards.push(response.card);

    });

    this.gameService.passedCardToTeammate().subscribe((response: any) => {
      const i = this.handCards.findIndex(x => x.title === response.card.title);
      this.handCards.splice(i, 1);
    });

    this.gameService.recievedCardFromTeammate().subscribe((response: any) => {
      console.warn('GOT CARD');
      console.log(response);
      this.handCards.push(response.card);
    });

    this.gameService.playedCard().subscribe((response: any) => {
      console.log('PLAYED CARD');
      console.log(response);
      // if the played card is from me:
      if (response.user === this.user) {
        const i = this.handCards.findIndex(x => x.title === response.card.title);
        this.handCards.splice(i, 1);
        this.myPlayedCards.push(response.card);
      }
      this.playedCards.push(response.card);
      // SCORING:
      console.log(response.card.atk);
      this.atk += response.card.atk;
      this.def += response.card.def;
    });

    this.gameService.possessionChanged().subscribe((response: any) => {
      this.atkToBeat = response;
    });
  }
  private drawHandCards(cards: any[]) {
    let i: number;
    for (let j = 0; j < this.NUMBER_OF_HAND_CARDS; j++) {
      i = this.randomInteger(cards.length);
      console.log(i);
      this.handCards.push(...cards.splice(i - 1, 1));
    }
    this.cards.push(...cards);
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.handCards, event.previousIndex, event.currentIndex);
  }


  private drawACard() {
    this.handCards.push(...this.cards.splice(this.randomInteger(this.cards.length) - 1, 1));
  }

  private randomInteger(max: number, min?: number) {
    if (!min) {
      min = 0;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private openDialog(response: any): void {
    const dialogRef = this.dialog.open(GameStateChangedComponent, {
      width: '250px',
      data: { dTitle: response.dTitle, dText: response.dText, team: '' },
      disableClose: response.dTitle === 'Select your Team!' ? true : false,
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        console.log('Dialog result: ');
        console.log(result);
        console.log('join team for now');
        this.teamSelection = result;
        this.gameService.getGameInfo();
        this.checkGame(this.gameId, this.teamSelection);

      }
    });
  }

  private checkGame(gameId: string, teamSelection: string) {
    // CHECK IF PLAYER IS IN GAME FORM SERVER
    if (this.gameService.confirmGame(gameId)) {
      console.log('Game confirmed');
    } else {
      console.warn('SOMETHING WENT WRONG!');

      // TODO: for now join user now!
      this.gameService.joinGame(gameId, teamSelection);
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: IngameComponentRouteParams) => {
      this.gameId = params.gameId;

      // ask for team if neccessary
      if (!params.team) {
        this.openDialog({ dTitle: 'Select your Team!', dText: '' });
      } else {
        this.teamSelection = params.team;

        // Only proceed if everything is okay ..
        this.gameService.getGameInfo();
        this.checkGame(params.gameId, params.team);

      }

    });
  }


  cardActionClicked(card: RCGCard) {
    console.log('Clicked: ' + card.title);
    // TODO: Switch based on card
    // TODO: add rules-engine
    if (this.cardActionText === 'Play') {
      // redraw:
      this.drawACard();
    }
    const newState = this.gameService.cardActionClicked(card);

    // this.gameService.playCard(card);
    if (newState === this.gameService.PASS_TO_TEAMMATE_STATE) {
      this.cardActionText = 'Pass';
      console.log(newState);
    } else if (newState === this.gameService.RALLY_STATE) {
      this.cardActionText = 'Play';
    }
    this.cdr.detectChanges();
  }

  startGame() {
    // What needs to be done?
    // Show Team selection
    if (!this.teamSelection) {
      this.openDialog({ dTitle: 'Select your Team!', dText: '' });
    }
    // prepare other stuff!
    this.cardActionText = 'Discard';
    this.gameService.startGame();
  }

  startPoint() {
    this.cardActionText = 'Discard';
    this.gameService.startPoint();

    this.playedCards = []; // TODO: move this to listener
    this.handCards = [];
    this.passedCards = [];
    this.discardedCards = [];
    this.myPlayedCards = [];



  }

  changePossession() {
    const atk = this.atk;
    this.atk = 0;
    this.def = 0;
    this.atkToBeat = 0;
    this.gameService.changePossession(atk);
  }
}
