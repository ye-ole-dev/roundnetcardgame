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

  gameId: string;
  user: string;
  state = 'initial';
  cardCounter = 0;
  team: string;
  cardToBePassed: any;

  constructor(
    private socket: Socket
  ) {
    // this.user = Math.random().toString();
    // this.gameId = Math.random().toString();
  }

  public getUser() {
    return this.user;
  }

  public startGame() {

    this.socket.emit('start-game', this.gameId);

  }

  public startPoint() {
    // What needs to be done for a new point?
    this.socket.emit('start-point', this.gameId);


  }

  public startedGame = () => {
    return new Observable((observer) => {
      this.socket.on('start-game', (response: any) => {
        this.state = 'initial';
        // this.gameId = response.name;
        // console.log(this.gameId + ' - Room');
        observer.next(response);
      });
    });
  }

  public startedPoint = () => {
    return new Observable((observer) => {
      this.socket.on('start-point', (response: any) => {
        this.state = 'initial';
        this.cardCounter = 0;
        observer.next(response);
      });
    });
  }

  public gameStateChanged = () => {
    return new Observable((observer) => {
      this.socket.on('game-state-changed', (response: any) => {
        observer.next(response);
      });
    });
  }

  public getGameInfo() {
    this.socket.emit('get-game-info', this.gameId);
  }

  public gameReadyChanged = () => {
    return new Observable((observer) => {
      this.socket.on('game-ready-changed', (response: any) => {
        observer.next(response);
      });
    });
  }

  public createGame(privateGame?: boolean) {
    // TODO checks

    const name = Date.now().toString() + Math.floor(Math.random()).toString();
    this.socket.emit('create-game', { name, privateGame });
    this.joinGame(name);
  }

  public createdGame = () => {
    return new Observable((observer) => {
      this.socket.on('create-game', (response: any) => {
        observer.next(response);
      });
    });
  }

  /** Joining the game on the server */
  public joinGame(gameId: string) {
    this.socket.emit('join-game', { gameId });
  }

  /** setting local variables for gameService */
  public joinedGame = () => {
    return new Observable((observer) => {
      this.socket.on('join-game', (response: any) => {
        console.log('joinedGame');
        this.gameId = response.gameId;
        observer.next(response);
      });
    });
  }

  /**Checks whether the gameService already knows about the game ..
   *
   */
  public confirmGame(gameId: string): boolean {
    console.log(gameId);
    console.log(this.gameId);
    if (gameId === this.gameId) {
      return true;
    }

    return false;
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
        console.log(response);
        console.log(this.team);
        if (response.team === this.team && response.user !== this.user) {
          // In the same Team, but not yourself (just to be sure)!
          if (this.cardToBePassed) {
            observer.next(response);
            observer.next(this.cardToBePassed);
            this.cardToBePassed = undefined;
          } else {
            this.cardToBePassed = response;
          }
        }
      });
    });
  }

  public setTeam(team: string) {
    this.team = team;
  }

  public possessionChanged = () => {
    return new Observable((observer) => {
      this.socket.on('change-possession', (response: any) => {
        observer.next(response);
      });
    });
  }

  public changePossession(atk: number) {
    this.socket.emit('change-possession', { gameId: this.gameId, atk });
  }

  public playedCard = () => {
    return new Observable((observer) => {
      this.socket.on('play-card', (response: any) => {
        observer.next(response);
      });
    });
  }

  /** Handles the cardActionClicked event */
  public cardActionClicked(card: RCGCard): string {
    // do stuff with current state
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
    // update state
    this.cardCounter++;
    if (this.cardCounter === 2) {
      this.state = this.PASS_TO_TEAMMATE_STATE;
    } else if (this.cardCounter === 4) {
      this.state = this.RALLY_STATE;
    }
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
    const team = this.team;
    this.socket.emit('pass-card-to-teammate', { card, user, team });
  }

  private playCard(card: RCGCard) {
    const user = this.user;
    const gameId = this.gameId;
    console.warn(gameId);
    // Play the Card
    this.socket.emit('play-card', { card, user, gameId });

  }

  public newUser = (name: string) => {
    this.user = name;
    this.socket.emit('new-user', name);
  }



}
