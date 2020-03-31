import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss']
})
export class IngameComponent implements OnInit {

  cards: any[] = [];
  playedCards: any[] = [];
  handCards: any[] = [];

  constructor(private gameService: GameService) {
    this.gameService.newGame().subscribe((response: any) => {
      console.log('NEW GAME');
      console.log(response);
      const cards = response.cards;
      console.log(cards);
      let i = 2;
      this.handCards.push(...cards.splice(i, 1));
      i = 3;
      this.handCards.push(...cards.splice(i, 1));
      i = 1;
      this.handCards.push(...cards.splice(i, 1));
      console.log(cards);
      this.cards.push(cards);

    });

    this.gameService.playedCard().subscribe((response: any) => {
      console.log('PLAYED CARD');
      console.log(response);

      const i = this.handCards.findIndex(x => x.name === response.card.name);
      this.handCards.splice(i, 1);

      this.playedCards.push(response.card);
    });
  }




  ngOnInit(): void {
  }


  startGame() {

    this.gameService.startGame('FirstGame');
  }

}
