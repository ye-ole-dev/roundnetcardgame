import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private socket: Socket
  ) { }

  public startGame(message: string) {
    this.socket.emit('start-game', message);
  }

  public newGame = () => {
    return new Observable((observer) => {
      this.socket.on('start-game', (response: any) => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  public playCard(card: any, user: any) {
    this.socket.emit('play-card', { card, user });
  }

  public playedCard = () => {
    return new Observable((observer) => {
      this.socket.on('play-card', (response: any) => {

        observer.next(response);
      });
    });
  }
}
