import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';

export interface RCGCard {
  title: string;
  descr: string;
  type: string; // TODO: make enum
  action: boolean;
  atk: number;
  def: number;
}

@Component({
  selector: 'app-rcg-card',
  templateUrl: './rcg-card.component.html',
  styleUrls: ['./rcg-card.component.scss']
})
export class RcgCardComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }



  @Input()
  card: RCGCard;

  ngOnInit(): void {

  }

  play(card: RCGCard) {
    console.log('Played: ' + card.title);

    this.gameService.playCard(card, 'Dummy');
    // TODO: remove this card from cards (add id)
    // send this card to other player
  }

}
