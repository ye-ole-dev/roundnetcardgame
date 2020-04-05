import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GameService } from 'src/app/game.service';
import { InfrastructureService } from '../infrastructure.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  teamSelection: string;
  gameId: string;
  privateGame: boolean;
  games: any[] = [];
  users: any[] = [];


  constructor(
    private gameService: GameService,
    private infrastructureService: InfrastructureService,
    private cdr: ChangeDetectorRef
  ) {
    this.gameService.createdGame().subscribe((response) => {
      console.log(response);
      // @ts-ignore
      if (response.games) {
        // @ts-ignore
        const games = response.games as any[];
        this.games = games;
      }
    });

    this.infrastructureService.newUser().subscribe((response) => {
      this.users.push({ string: response });

      this.cdr.detectChanges();
    });


  }

  ngOnInit(): void {
  }

  createGame() {
    this.gameService.createGame(this.teamSelection, this.privateGame);
  }

  joinGame() {
    if (!this.gameId) {
      console.warn('No Game Id');
    }
    this.gameService.joinGame(this.gameId, this.teamSelection);
  }
}
