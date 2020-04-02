import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { GameService } from '../game.service';
import { AuthService } from '../auth/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  gameId: string;

  constructor(
    private router: Router,
    private gameService: GameService,
    private authService: AuthService
  ) { }

  name = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'Enter a name!';
    }
  }





  ngOnInit(): void {
  }

  login() {


    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        // console.log(this.authService.redirectUrl);
        const url = this.authService.redirectUrl ? this.authService.redirectUrl : '/lobby';
        this.router.navigate([url]);
        this.gameService.newUser(this.name.value);
      }
    });

    this.router.navigate(['/lobby']);
    // TODO: route to "lobby"
    // TODO: player ready check in lobby
    // TODO: join rooms in lobby
    // TODO: etc. pp
  }

}
