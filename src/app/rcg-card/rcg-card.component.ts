import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-rcg-card',
  templateUrl: './rcg-card.component.html',
  styleUrls: ['./rcg-card.component.scss']
})
export class RcgCardComponent implements OnInit {

  constructor(
    private gameService: GameService
  ) { }

  title: string;
  descr: string;
  type: string; // TODO: make enum
  atk: number;
  def: number;

  @Input()
  card: any;

  ngOnInit(): void {
    this.title = 'Cut Serve';
    this.descr = 'A serve which alters direction on hitting the net.'

    if (this.card) {
      this.title = this.card.title;
      this.descr = this.card.descr;
      this.type = this.card.type;
      this.atk = this.card.atk;
      this.def = this.card.def;
    }
  }

  play(card: any) {
    console.log('Played: ' + card.title);

    this.gameService.playCard(card, 'Dummy');
    // TODO: remove this card from cards (add id)
    // send this card to other player
  }

}
