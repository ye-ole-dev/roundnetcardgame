import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  title = 'Help';
  sections = [
    {
      title: 'Dummy',
      content: 'Some text'
    }
  ];
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    /*  this.route.url.subscribe((url: UrlSegment[]) => {
        console.log(url);
      });
      this.route.data.subscribe((data: any) => {
        console.log(data);
      });
      this.route.fragment.subscribe((data: any) => {
        console.log(data);
      });
      this.route.paramMap.subscribe((data: any) => {
        console.log(data);
      });
  */
    this.router.events.subscribe((data: any) => {
      // console.log(data);
      console.log(this.router.url);
      if (this.router.url === '/lobby') {
        this.sections = [{
          title: 'Lobby',
          content: 'You can chat, create or join a game.'
        }];
      } else if (this.router.url === '/login') {
        this.sections = [{
          title: 'Login',
          content: 'Log in with a name and the License `Roundnet`'
        }];
      } else if (this.router.url.startsWith('/ingame')) {
        this.title = 'Ingame',
          this.sections = [{
            title: 'Rules',
            content: 'Have more def than the opposing teams atk to return the ball!'
          }, {
            title: 'Discarding Cards',
            content: 'To start off each point, you choose 2 cards, which you`ll put back into the deck'
          }, {
            title: 'Passing Cards',
            content: 'After discarding 2 cards, you choose 2 cards, which you`ll pass over to your teammate'
          }, {
            title: 'Playing',
            content: `Choose appropriate cards to reach your opponents ATK value with your DEF value.
             Your cummulated ATK value will be theirs to beat.
             The ATK value is the number on the bottom left of the card, the DEF value is on the bottom right.`
          }, {
            title: 'Disclaimer',
            content: `Right now, the game is still in early development. There might be many bugs and unexpected behaviour!
            Feel free to reach out to me to report on them!`
          }, {
            title: 'Issues List',
            content: `You need to 'End your possession', by clicking on the button 'Change possession' manually,
            You need to check your points (ATK vs DEF) manually and click 'Start Point' if one team fails to 'return the ball'.`
          }];
      }

    });

  }

  ngOnInit(): void {

  }

}
