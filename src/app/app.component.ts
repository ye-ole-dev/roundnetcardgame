import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';

import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roundnetcardgame';
  newMessage: string;
  messageList: string[] = [];

  constructor(
    private chatService: ChatService,
    private socket: Socket,
    private cdr: ChangeDetectorRef
  ) {
    /*
        this.socket.on('new-message', (message) => {
          console.log(message);
        }); */


    this.chatService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);
      //this.cdr.detectChanges();
    });
  }

  OnInit() {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }


}
