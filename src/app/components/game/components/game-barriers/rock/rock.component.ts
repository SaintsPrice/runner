import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GameLevels} from "../../../models/game-levels.enum";

@Component({
  selector: 'app-rock',
  standalone: true,
  imports: [],
  templateUrl: './rock.component.html',
  styleUrl: './rock.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RockComponent {
  @Input() level: GameLevels = GameLevels.FIRST_LEVEL;
  @Output() barrierOutForGameZone: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  protected handleAnimationEnd($event: HTMLElement) {
    this.barrierOutForGameZone.emit($event);
  }
}
