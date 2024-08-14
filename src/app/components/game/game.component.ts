import {AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {HeroComponent} from "./components/hero/hero.component";
import {GameLevels} from "./models/game-levels.enum";
import {GameBarriersComponent} from "./components/game-barriers/game-barriers.component";
import {GameOverComponent} from "./components/game-over/game-over.component";
import {ActivatedRoute} from "@angular/router";
import {LevelCompleteComponent} from "./components/level-complete/level-complete.component";
import {RecordService} from "./services/record.service";
import {AudioService} from "../audio/services/audio.service";
import {EndingComponent} from "./components/ending/ending.component";

export const recordTime: Record<GameLevels, number> = {
  [GameLevels.FIRST_LEVEL]: 500,
  [GameLevels.SECOND_LEVEL]: 400,
  [GameLevels.THIRD_LEVEL]: 300,
  [GameLevels.FOURTH_LEVEL]: 200,
  [GameLevels.FIFTH_LEVEL]: 100
}

export const levelTime: Record<GameLevels, number> = {
  [GameLevels.FIRST_LEVEL]: 10000,
  [GameLevels.SECOND_LEVEL]: 10000,
  [GameLevels.THIRD_LEVEL]: 10000,
  [GameLevels.FOURTH_LEVEL]: 10000,
  [GameLevels.FIFTH_LEVEL]: 10000
}
// 1000 * 60 * 2
// 1000 * 60 * 4
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    HeroComponent,
    GameBarriersComponent,
    GameOverComponent,
    LevelCompleteComponent,
    EndingComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements AfterViewInit, OnDestroy{
  protected level: GameLevels = GameLevels.FIRST_LEVEL;

  protected isAlive: boolean = true;
  protected levelFinish = false;

  protected gameFinish: boolean = false;

  private checkIsAliveInterval: any;
  private recordInterval: any;
  private levelTimeTimeout: any;

  constructor(private activateRoute: ActivatedRoute,
              protected recordService: RecordService,
              protected audioService: AudioService) {
    this.level = parseInt(this.activateRoute.snapshot.params['level']);

    if(this.level === 5) {
      this.audioService.setFiveLevel();
    } else {
      this.audioService.setFiveLevelDefault();
    }
  }

  ngAfterViewInit(): void {
    this.levelTime();
    this.handleRecord();
    this.checkIsAlive();
  }

  ngOnDestroy(): void {
    clearTimeout(this.levelTimeTimeout);
    clearInterval(this.recordInterval);
  }

  protected checkIsAlive() {
    this.checkIsAliveInterval = setInterval(() => {
      const heroElement = document.querySelector('.hero');
      const barrierElement = document.querySelector('.barriers')?.querySelectorAll('.barrier')[0]?.firstElementChild;

      if(!heroElement || !barrierElement) {
        return;
      }

      const heroTop = parseInt(window.getComputedStyle(heroElement).getPropertyValue("top"));
      const barrierLeft = parseInt(window.getComputedStyle(barrierElement).getPropertyValue("left"));

      if(barrierElement.className.includes('bird')) {
        if (barrierLeft < (heroElement.clientWidth - 20) && barrierLeft > 0 && heroTop <= (barrierElement.clientHeight * -1)) {
          this.gameOver();
        }
        return;
      }

      if (barrierLeft < (heroElement.clientWidth - 20) && barrierLeft > 0 && heroTop >= (barrierElement.clientHeight * -1) + 20) {
        this.gameOver();
      }
    }, 10)
  }

  private gameOver() {
    this.isAlive = false;
    clearInterval(this.checkIsAliveInterval);
    clearInterval(this.recordInterval);
    clearInterval(this.levelTimeTimeout);
    this.audioService.setFailed();
  }

  private levelTime() {
    this.levelTimeTimeout = setTimeout(() => {
      if(this.level === 5) {
        (document.querySelector('.five-level-audio') as HTMLAudioElement).muted = true;
        this.gameFinish = true;
      }
      this.levelFinish = true;
      this.audioService.setSuccess();
      if(parseInt(localStorage.getItem('level') ?? '0') < this.level + 1) {
        localStorage.setItem('level', (this.level + 1).toString());
      }
      clearInterval(this.checkIsAliveInterval);
      clearInterval(this.recordInterval);
      clearInterval(this.levelTimeTimeout);
    }, levelTime[this.level]);
  }

  private handleRecord() {
    this.recordInterval = setInterval(() => {
      this.recordService.increaseRecord();
    }, recordTime[this.level])
  }
}
