import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCardComponent } from './rank-card.component';

describe('RankCardComponent', () => {
  let component: RankCardComponent;
  let fixture: ComponentFixture<RankCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
