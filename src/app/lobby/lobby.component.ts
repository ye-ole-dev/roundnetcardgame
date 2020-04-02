import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game.service';

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


  constructor(
    private gameService: GameService
  ) {
    this.gameService.createdGame().subscribe((response) => {
      console.log(response);
      // @ts-ignore
      if (response.games) {
        // @ts-ignore
        const games = response.games as any[];
        this.games = games;
      }
    }

    );
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
