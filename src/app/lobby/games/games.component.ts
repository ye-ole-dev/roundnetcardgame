import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {


  @Input()
  list: any[];

  @Input()
  key: string;

  @Input()
  title: string;

  constructor() {

  }



  ngOnInit(): void {

  }


  ngOnChange() {

  }
}
