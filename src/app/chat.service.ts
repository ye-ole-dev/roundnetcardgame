import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private socket: Socket
  ) {
  }

  public sendMessage(message: string, roomName?: string) {
    if (roomName) {
      console.log('Send Message to room: ' + message, roomName);
      this.socket.emit('new-message-to-room', { message, roomName });
    } else {
      this.socket.emit('new-message', message);
    }
  }

  public getMessages = () => {
    return new Observable((observer) => {
      this.socket.on('new-message', (message: string) => {
        console.log('new-message');
        observer.next(message);
      });
    });
  }

}
