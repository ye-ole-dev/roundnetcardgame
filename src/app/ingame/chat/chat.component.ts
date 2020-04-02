import { Component, OnInit, Input } from '@angular/core';
import { ChatService, NewMessage } from 'src/app/chat.service';
import { GameService } from 'src/app/game.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  name: string;

  newMessage: string;
  messageList: NewMessage[] = [];


  @Input()
  gameId: string;

  constructor(
    private chatService: ChatService,
    private gameService: GameService
  ) {


    this.chatService.getMyData().subscribe((response: any) => {
      // console.log(response);
    });

    this.chatService.getMessages().subscribe((response: NewMessage) => {
      this.messageList.push(response);
      // console.log(this.messageList);
    });
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage, this.gameId);
    this.newMessage = '';
  }
}
