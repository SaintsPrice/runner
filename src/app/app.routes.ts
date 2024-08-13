import { Routes } from '@angular/router';
import {StartPageComponent} from "./components/start-page/start-page.component";
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {LevelsComponent} from "./components/levels/levels.component";
import {RecordsComponent} from "./components/records/records.component";
import {GameComponent} from "./components/game/game.component";
import {MenuComponent} from "./components/menu/menu.component";

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        component: StartPageComponent
      },
      {
        path: 'main-menu',
        component: MainMenuComponent
      },
      {
        path: 'levels',
        component: LevelsComponent
      },
      {
        path: 'records',
        component: RecordsComponent
      },
    ]
  },
  {
    path: 'game/:level',
    component: GameComponent
  }
];
