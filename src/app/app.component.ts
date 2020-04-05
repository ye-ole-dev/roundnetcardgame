import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';

import { Socket } from 'ngx-socket-io';
import { GameService } from './game.service';
import { Router } from '@angular/router';
import { InfrastructureService } from './infrastructure.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roundnetcardgame';
  sidenav = false;

  constructor(
    private gameService: GameService,
    private infrastructureService: InfrastructureService,
    private router: Router
  ) {
    this.infrastructureService.serverError().subscribe((response: any) => {
      alert('SERVER ERROR! PLEASE TRY AGAIN LATER');
      this.router.navigate(['/login']);
    });

    this.gameService.joinedGame().subscribe((response: any) => {

      if (response) {
        this.router.navigate(['/ingame', response.gameId]);
      }
    }


    );

  }

  OnInit() {
  }




}
