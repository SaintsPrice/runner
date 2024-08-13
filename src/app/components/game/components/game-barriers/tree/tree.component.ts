import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {GameLevels} from "../../../models/game-levels.enum";
import {Barriers} from "../models/barriers.enum";

@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent {
  @Input() level: GameLevels = GameLevels.FIRST_LEVEL;
  @Output() barrierOutForGameZone: EventEmitter<HTMLElement> = new EventEmitter<HTMLElement>();

  protected handleAnimationEnd(treeElement: HTMLElement) {
    this.barrierOutForGameZone.emit(treeElement);
  }
}
