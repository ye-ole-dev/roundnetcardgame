import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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

  cardActionText = 'Discard';

  @Input()
  card: RCGCard;

  @Input()
  deck: boolean;

  @Input()
  playable: boolean;

  @Output()
  cardActionClickedEvent = new EventEmitter();

  ngOnInit(): void {
  }



  cardActionClicked(card: RCGCard) {
    this.cardActionClickedEvent.emit(card);


  }

}
