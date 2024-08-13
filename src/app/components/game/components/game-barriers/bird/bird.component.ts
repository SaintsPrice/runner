import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import {GameLevels} from "../../../models/game-levels.enum";

@Component({
  selector: 'app-bird',
  standalone: true,
  imports: [],
  templateUrl: './bird.component.html',
  styleUrl: './bird.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BirdComponent implements AfterViewInit {
  @Input() level: GameLevels = GameLevels.FIRST_LEVEL;
  @Output() barrierOutForGameZone: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  protected birdImgIndex: number = 1;
  protected birdImg: string = `game/bird/${this.birdImgIndex}.png`;

  private birdSpeed = 100;

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.animateBird();
  }

  protected handleAnimationEnd($event: HTMLElement) {
    this.barrierOutForGameZone.emit($event);
  }

  private animateBird() {
    setInterval(() => {
      if (this.birdImgIndex === 5) {
        this.birdImgIndex = 1;
      } else {
        this.birdImgIndex += 1;
      }
      this.birdImg = `game/bird/${this.birdImgIndex}.png`;
      this.changeDetection.markForCheck();
    }, this.birdSpeed)
  }
}
