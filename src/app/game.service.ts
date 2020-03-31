import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  room: string;
  user: string;

  constructor(
    private socket: Socket
  ) { }

  public startGame(message: string) {
    this.socket.emit('start-game', message);
  }

  public newGame = () => {
    return new Observable((observer) => {
      this.socket.on('start-game', (response: any) => {


        this.room = response.name;
        console.log(this.room + ' - Room');
        observer.next(response);
      });
    });
  }

  public getRoomInfo(roomName: string) {
    this.socket.emit('room-info', roomName);
    return new Observable((observer) => {
      this.socket.on('room-info', (response: any) => {
        observer.next(response);
      });
    });
  }

  public playCard(card: any) {
    const user = this.user;
    this.socket.emit('play-card', { card, user });
  }

  public playedCard = () => {
    return new Observable((observer) => {
      this.socket.on('play-card', (response: any) => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  public newUser = (name: string) => {
    this.user = name;
    this.socket.emit('new-user', name);
  }

}
