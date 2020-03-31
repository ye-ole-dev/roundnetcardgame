import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private gameService: GameService
  ) { }

  name: string;

  ngOnInit(): void {
  }

  login() {
    this.gameService.newUser(this.name);
    this.router.navigate(['/ingame']);
    // TODO: route to "lobby"
    // TODO: player ready check in lobby
    // TODO: join rooms in lobby
    // TODO: etc. pp
  }

}
