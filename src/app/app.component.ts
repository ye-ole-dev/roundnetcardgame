import { Component, ChangeDetectorRef } from '@angular/core';
import { ChatService } from './chat.service';

import { Socket } from 'ngx-socket-io';
import { GameService } from './game.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roundnetcardgame';
  newMessage: string;
  messageList: string[] = [];

  cards: any[] = [];
  playedCards: any[] = [];

  constructor(
    private chatService: ChatService,
    private gameService: GameService
  ) {


    this.chatService.getMessages().subscribe((message: string) => {
      this.messageList.push(message);
      console.log(this.messageList);

    });

    this.gameService.newGame().subscribe((response: any) => {
      console.log(response);
      this.cards.push(...response.cards);
    });

    this.gameService.playedCard().subscribe((response: any) => {
      console.log('PLAYED CARD');
      console.log(response);
      this.playedCards.push(response.card);
    });
  }

  OnInit() {
  }

  sendMessage() {
    this.chatService.sendMessage(this.newMessage);
    this.newMessage = '';
  }

  startGame() {
    this.gameService.startGame('');
  }


}
