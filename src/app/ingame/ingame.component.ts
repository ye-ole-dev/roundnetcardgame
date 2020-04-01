import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { RCGCard } from '../rcg-card/rcg-card.component';

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

  cardActionText: string;

  constructor(private gameService: GameService) {
    this.gameService.newGame().subscribe((response: any) => {
      console.log('NEW GAME');
      console.log(response);
      const cards = response.cards;

      this.drawHandCards(cards);

    });

    this.gameService.discardedCard().subscribe((response: any) => {
      const i = this.handCards.findIndex(x => x.title === response.card.title);
      console.log(this.handCards);
      this.handCards.splice(i, 1);
      this.discardedCards.push(response.card);
      console.log(this.handCards);
      console.log(this.discardedCards);
    });

    this.gameService.passedCardToTeammate().subscribe((response: any) => {
      const i = this.handCards.findIndex(x => x.title === response.card.title);
      this.handCards.splice(i, 1);
    });

    this.gameService.recievedCardFromTeammate().subscribe((response: any) => {
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



  ngOnInit(): void {
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

  startGame() {

    this.gameService.startGame('FirstGame');
  }

}
