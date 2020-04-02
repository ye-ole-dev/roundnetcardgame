import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateChangedComponent } from './game-state-changed.component';

describe('GameStateChangedComponent', () => {
  let component: GameStateChangedComponent;
  let fixture: ComponentFixture<GameStateChangedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStateChangedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStateChangedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
