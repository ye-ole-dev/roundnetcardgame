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

  constructor(private gameService: GameService) {
    this.gameService.newGame().subscribe((response: any) => {
      console.log('NEW GAME');
      console.log(response);
      this.cards.push(...response.cards);
    });

    this.gameService.playedCard().subscribe((response: any) => {
      console.log('PLAYED CARD');
      console.log(response);
      this.playedCards.push(response.card);
    });
  }

  ngOnInit(): void {
  }


  startGame() {
    this.gameService.startGame('');
  }

}
