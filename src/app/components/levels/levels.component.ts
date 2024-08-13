import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LevelsComponent {
  protected level: number = parseInt(localStorage.getItem('level') ?? '1');

  constructor(protected router: Router) {
  }

  protected goToLevel(level: number) {
    this.router.navigateByUrl(`game/${level}`)
  }
}
