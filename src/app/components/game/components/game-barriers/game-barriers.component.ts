import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TreeComponent} from "./tree/tree.component";
import {RockComponent} from "./rock/rock.component";
import {BirdComponent} from "./bird/bird.component";
import {Barriers} from "./models/barriers.enum";
import {GameLevels} from "../../models/game-levels.enum";

export const speedBarriersSpawn: Record<GameLevels, number> = {
  [GameLevels.FIRST_LEVEL]: 1500,
  [GameLevels.SECOND_LEVEL]: 1000,
  [GameLevels.THIRD_LEVEL]: 900,
  [GameLevels.FOURTH_LEVEL]: 800,
  [GameLevels.FIFTH_LEVEL]: 600
}

@Component({
  selector: 'app-game-barriers',
  standalone: true,
  imports: [
    TreeComponent,
    RockComponent,
    BirdComponent
  ],
  templateUrl: './game-barriers.component.html',
  styleUrl: './game-barriers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBarriersComponent implements OnChanges, AfterViewInit {
  @Input() level: GameLevels = GameLevels.FIRST_LEVEL;
  @Input() isLevelFinish: boolean = false;

  protected barriers: Barriers[] = [];
  protected speedBarriersSpawn = speedBarriersSpawn[this.level];

  private spawnBarrierInterval: any

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
        if('isLevelFinish' in changes) {
          clearInterval(this.spawnBarrierInterval);
          this.barriers = [];
        }
    }

  ngAfterViewInit(): void {
    this.calculateSpeedBarriersSpawnByLevel();
    this.spawnBarrier();
    this.randomBarrier();
  }

  protected handleBarrierOutForGameZone($event: HTMLElement) {
    $event.parentElement!.remove();
    $event.remove();
  }

  private spawnBarrier() {
    this.spawnBarrierInterval = setInterval(() => {
      this.barriers.push(this.randomBarrier());
      this.changeDetection.markForCheck();
    }, this.speedBarriersSpawn);
  }

  private randomBarrier() {
    const randomNumber = Math.random() * 100;

    if(randomNumber < 33) {
      return Barriers.TREE;
    }
    if(randomNumber < 66) {
      return Barriers.ROCK;
    }
    return Barriers.BIRD;
  }

  private calculateSpeedBarriersSpawnByLevel() {
    this.speedBarriersSpawn = speedBarriersSpawn[this.level];
  }

  protected readonly Barriers = Barriers;
}
