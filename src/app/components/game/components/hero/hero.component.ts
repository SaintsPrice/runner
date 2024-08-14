import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {GameLevels} from "../../models/game-levels.enum";
import {fromEvent, Observable} from "rxjs";
import {Platform} from "@angular/cdk/platform";

export const jumpTime: Record<GameLevels, number> = {
  [GameLevels.FIRST_LEVEL]: 1200,
  [GameLevels.SECOND_LEVEL]: 800,
  [GameLevels.THIRD_LEVEL]: 750,
  [GameLevels.FOURTH_LEVEL]: 700,
  [GameLevels.FIFTH_LEVEL]: 550,
}

export const heroSpeed: Record<GameLevels, number> = {
  [GameLevels.FIRST_LEVEL]: 100,
  [GameLevels.SECOND_LEVEL]: 90,
  [GameLevels.THIRD_LEVEL]: 85,
  [GameLevels.FOURTH_LEVEL]: 80,
  [GameLevels.FIFTH_LEVEL]: 15,
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() level: GameLevels = GameLevels.FIRST_LEVEL;
  @Input() isLevelFinish: boolean = false;

  protected clickEvent: Observable<Event> = fromEvent<Event>(document, 'click');
  protected touchEvent: Observable<Event> = fromEvent<Event>(document, 'touchstart');
  protected spaceEvent: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(document, 'keydown');

  private heroImgIndex = 1;
  protected heroImgSrc = `catty/${this.heroImgIndex}.png`;

  protected jumpTime: number = 1200;
  protected isJumping: boolean = false;

  private heroSpeed: number = 100;

  private animateHeroInterval: any

  constructor(private changeDetection: ChangeDetectorRef, private platform: Platform) {
    if (this.platform.IOS) {
      this.touchEvent.subscribe(() => {
        this.jump();
      })
    } else {
      this.clickEvent.subscribe(() => {
        this.jump();
      });
      this.spaceEvent.subscribe(($event: KeyboardEvent) => {
        if ($event.code === 'Space') {
          this.jump();
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('isLevelFinish' in changes) {
    }
  }

  ngOnInit(): void {
    this.calculateJumpTimeByLevel();
    this.calculateHeroSpeedByLevel()
  }

  ngAfterViewInit(): void {
    this.animateHero();
  }

  protected jump() {
    if (this.isJumping) return;
    this.isJumping = true;
    setTimeout(() => {
      this.isJumping = false;
    }, this.jumpTime);
  }

  private animateHero() {
    this.animateHeroInterval = setInterval(() => {
      if (this.heroImgIndex === 12) {
        this.heroImgIndex = 1;
      } else {
        this.heroImgIndex += 1;
      }
      this.heroImgSrc = `catty/${this.heroImgIndex}.png`;
      this.changeDetection.markForCheck();
    }, this.heroSpeed);
  }

  private calculateJumpTimeByLevel() {
    this.jumpTime = jumpTime[this.level];
  }

  private calculateHeroSpeedByLevel() {
    this.heroSpeed = heroSpeed[this.level];
  }
}
