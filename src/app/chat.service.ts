import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';
import { Message } from './message';
import { Observable } from 'rxjs';

export interface NewMessage {
  message: string;
  from: string;
}

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
      this.socket.on('new-message', (response: NewMessage) => {
        console.log('new-message');
        observer.next(response);
      });
    });
  }

  public getMyData = () => {
    return new Observable((observer) => {
      this.socket.on('my-data', (response: any) => {
        console.log(response);
        observer.next(response);
      });
    });
  }

}
