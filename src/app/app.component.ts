import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';

import { Socket } from 'ngx-socket-io';
import { GameService } from './game.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roundnetcardgame';


  constructor(
    private gameService: GameService,
    private router: Router
  ) {
    this.gameService.joinedGame().subscribe((response: any) => {
      console.log(response);
      if (response) {

        console.log(response);
        this.router.navigate(['/ingame', response.gameId, response.team]);
      }
    }

    );

  }

  OnInit() {
  }




}
