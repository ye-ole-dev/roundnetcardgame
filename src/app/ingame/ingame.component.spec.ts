import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngameComponent } from './ingame.component';
import { GameService } from '../game.service';

class MockGameService {
  startGame() { }

  newGame() { }

  playedCard() { }

};

describe('IngameComponent', () => {
  let component: IngameComponent;
  let fixture: ComponentFixture<IngameComponent>;
  // let mockedGameService: MockGameService;
  let service: GameService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IngameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngameComponent);
    service = new GameService(undefined);


    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should draw the exact amount of cards', () => {
    component.handCards = [];
    component.cards = [];
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];



    // tslint:disable-next-line: no-string-literal
    component['drawHandCards'](cards);

    console.log(component.cards.length);
    console.log(component.handCards.length);

  });

  afterEach(() => {
    service = null;
    component = null;
  });
});
