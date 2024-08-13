import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBarriersComponent } from './game-barriers.component';

describe('GameBarriersComponent', () => {
  let component: GameBarriersComponent;
  let fixture: ComponentFixture<GameBarriersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBarriersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameBarriersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
