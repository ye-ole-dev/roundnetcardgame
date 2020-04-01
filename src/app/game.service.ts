import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { RCGCard } from './rcg-card/rcg-card.component';
import { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER } from '@angular/cdk/overlay/keyboard/overlay-keyboard-dispatcher';



@Injectable({
  providedIn: 'root'
})
export class GameService {

  public PASS_TO_TEAMMATE_STATE = 'pass-to-teammate';
  public RALLY_STATE = 'rally';

  room: string;
  user: string;
  state = 'initial';
  cardCounter = 0;

  constructor(
    private socket: Socket
  ) { }

  public startGame(message: string) {
    this.socket.emit('start-game', message);
  }

  public newGame = () => {
    return new Observable((observer) => {
      this.socket.on('start-game', (response: any) => {

        this.state = 'initial';
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

  public discardedCard = () => {
    return new Observable((observer) => {
      this.socket.on('discard-card', (response: any) => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  public passedCardToTeammate = () => {
    return new Observable((observer) => {
      this.socket.on('pass-card-to-teammate', (response: any) => {
        observer.next(response);
      });
    });
  }

  public recievedCardFromTeammate = () => {
    return new Observable((observer) => {
      this.socket.on('recieve-card-from-teammate', (response: any) => {
        observer.next(response);
      });
    });
  }


  public playedCard = () => {
    return new Observable((observer) => {
      this.socket.on('play-card', (response: any) => {
        console.log(response);
        observer.next(response);
      });
    });
  }

  /** Handles the cardActionClicked event */
  public cardActionClicked(card: RCGCard): string {
    if (this.cardCounter === 2) {
      this.state = this.PASS_TO_TEAMMATE_STATE;
    } else if (this.cardCounter === 4) {
      this.state = this.RALLY_STATE;
    }

    if (this.state === 'initial') {
      // Discard Card
      this.discardCard(card);
    } else if (this.state === this.PASS_TO_TEAMMATE_STATE) {
      this.passCardToTeammate(card);
    } else if (this.state === this.RALLY_STATE) {
      this.playCard(card);
    } else {
      console.warn('State: ' + this.state + ' not handled in game.service.ts');
    }
    this.cardCounter++;
    return this.state;
  }

  private discardCard(card: RCGCard) {
    // remove card from player
    // add card to cards
    const user = this.user;
    console.log('Emitting discard-card');
    this.socket.emit('discard-card', { card, user });
  }

  private passCardToTeammate(card: RCGCard) {
    const user = this.user;
    this.socket.emit('pass-card-to-teammate', { card, user });
  }

  private playCard(card: RCGCard) {
    const user = this.user;
    this.socket.emit('play-card', { card, user });
  }

  public newUser = (name: string) => {
    this.user = name;
    this.socket.emit('new-user', name);
  }



}
