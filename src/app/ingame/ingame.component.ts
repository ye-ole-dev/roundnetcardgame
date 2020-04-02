import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { RCGCard } from '../rcg-card/rcg-card.component';
import { ActivatedRoute, Params } from '@angular/router';
import { GameStateChangedComponent } from './dialogs/game-state-changed/game-state-changed.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  cards: any[] = [];
  playedCards: any[] = [];
  discardedCards: any[] = [];
  handCards: any[] = [];
  NUMBER_OF_HAND_CARDS = 7; // 5 + 2 to discard
  teamSelection: string;
  gameId: string;
  gameReady = false;
  gameReadyText: string;


  cardActionText: string;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    this.gameService.joinedGame().subscribe((response: any) => {
      console.log(response);
    });

    this.gameService.gameReadyChanged().subscribe((response: any) => {
      this.gameReady = response.ready;
      this.gameReadyText = response.text;
    });

    this.gameService.gameStateChanged().subscribe((response: any) => {

      this.openDialog(response);
    });

    this.gameService.startedGame().subscribe((response: any) => {
      console.log('Started Game');
      console.log(response);
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
      console.log(response.card.title);
      const i = this.handCards.findIndex(x => x.title === response.card.title);
      this.handCards.splice(i, 1);

      this.playedCards.push(response.card);
    });
  }
  private drawHandCards(cards: any[]) {
    let i: number;
    for (let j = 0; j < this.NUMBER_OF_HAND_CARDS; j++) {
      i = this.randomInteger(cards.length);
      this.handCards.push(...cards.splice(i - 1, 1));
    }
    this.cards.push(cards);
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
      data: { name: response.dTitle, animal: response.dText }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.gameId = params.gameId;
      this.teamSelection = params.team;

      this.gameService.getGameInfo();

      // CHECK IF PLAYER IS IN GAME FORM SERVER

      if (this.gameService.confirmGame(params.gameId)) {
        console.log('Game confirmed');
      } else {
        console.warn('SOMETHING WENT WRONG!');

        // TODO: for now join user now!
        this.gameService.joinGame(this.gameId, this.teamSelection);
      }
    });
  }


  cardActionClicked(card: RCGCard) {
    console.log('Clicked: ' + card.title);
    // TODO: Switch based on card
    // TODO: add rules-engine
    const newState = this.gameService.cardActionClicked(card);
    // this.gameService.playCard(card);
    if (newState === this.gameService.PASS_TO_TEAMMATE_STATE) {
      this.cardActionText = 'Pass';
      console.log(newState);
    } else if (newState === this.gameService.RALLY_STATE) {
      this.cardActionText = 'Play';
    }
  }

  ready() {

    this.gameService.startGame();
  }

}
