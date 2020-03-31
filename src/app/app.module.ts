import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AngularSplitModule } from 'angular-split';
import { DragDropModule } from '@angular/cdk/drag-drop';

// Customs
import { RcgCardComponent } from './rcg-card/rcg-card.component';
import { LoginComponent } from './login/login.component';
import { IngameComponent } from './ingame/ingame.component';
import { ChatComponent } from './ingame/chat/chat.component';
import { AboutComponent } from './about/about.component';

// This sets the SocketIoConfig up to work with local testing as well as deployment on heroku
const hostname = window.location.hostname;
const url = (hostname === 'localhost') ? `${window.location.protocol}//${hostname}:3456` : undefined;
const config: SocketIoConfig = { url, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    RcgCardComponent,
    LoginComponent,
    IngameComponent,
    ChatComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    DragDropModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    AngularSplitModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
