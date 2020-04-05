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

  icon: string;

  @Input()
  card: RCGCard;

  @Input()
  deck: boolean;

  @Input()
  playable: boolean;

  @Input()
  cardActionText: string;

  @Output()
  cardActionClickedEvent = new EventEmitter();

  ngOnInit(): void {
    this.cardActionText = this.cardActionText ? this.cardActionText : 'Discard';
    this.icon = 'ball';
    if (this.card) {
      switch (this.card.type) {
        case 'serve':
          this.icon = 'sports_handball';
          break;
        case 'hit':
          this.icon = 'slow_motion_video';
          break;
        case 'recieve':
          // this.icon = 'settings_backup_restore';
          this.icon = 'policy';
          break;
        case 'set':
          this.icon = 'gps_fixed';
          break;
        default:
          this.icon = 'sports_volleyball';

      }
    }


  }



  cardActionClicked(card: RCGCard) {
    this.cardActionClickedEvent.emit(card);


  }

}
