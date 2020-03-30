import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';

import { Socket } from 'ngx-socket-io';
import { GameService } from './game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roundnetcardgame';


  constructor(
  ) {




  }

  OnInit() {
  }




}
