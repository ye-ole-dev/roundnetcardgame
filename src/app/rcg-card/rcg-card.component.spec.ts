import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcgCardComponent } from './rcg-card.component';

describe('RcgCardComponent', () => {
  let component: RcgCardComponent;
  let fixture: ComponentFixture<RcgCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcgCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
