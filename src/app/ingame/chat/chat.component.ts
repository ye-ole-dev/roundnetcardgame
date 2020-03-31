import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/chat.service';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  roomName: string;
  newMessage: string;
  messageList: string[] = [];

  constructor(
    private chatService: ChatService,
    private gameService: GameService
  ) {


    this.chatService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);
    });

    this.gameService.newGame().subscribe((response: any) => {
      console.log('Chat Component logs: ');
      console.log(response);
      // A new game was created! Switch to the room:
      this.roomName = response.name;

    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage, this.roomName);
    this.newMessage = '';
  }
}
