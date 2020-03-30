import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
  private router: Router,
  ) { }

  name: string;

  ngOnInit(): void {
  }

  login() {
    console.log(this.name);
    this.router.navigate(['/ingame']);
  }

}
