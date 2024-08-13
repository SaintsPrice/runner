import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecordService} from "../../services/record.service";

@Component({
  selector: 'app-game-over',
  standalone: true,
  imports: [],
  templateUrl: './game-over.component.html',
  styleUrl: './game-over.component.scss'
})
export class GameOverComponent {
  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              protected recordService: RecordService) {
  }

  protected again() {
    this.redirectTo('game/' + this.activateRoute.snapshot.params['level']);
    this.recordService.clearRecord();
  }

  protected toMainMenu() {
    this.router.navigateByUrl('main-menu');
    this.recordService.clearRecord();
  }

  private redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }
}
