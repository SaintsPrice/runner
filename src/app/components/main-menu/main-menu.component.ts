import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent {
  constructor(protected router: Router) {
  }
}
