import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  newMessage: string;
  messageList: string[] = [];

  constructor(
    private chatService: ChatService
  ) {


    this.chatService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);

    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }
}
