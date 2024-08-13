import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecordService} from "../../services/record.service";

@Component({
  selector: 'app-level-complete',
  standalone: true,
  imports: [],
  templateUrl: './level-complete.component.html',
  styleUrl: './level-complete.component.scss'
})
export class LevelCompleteComponent {
  constructor(private router: Router,
              private activateRoute: ActivatedRoute,
              private recordService: RecordService) {
  }

  protected next() {
    this.redirectTo('game/' + (parseInt((this.activateRoute.snapshot.params['level'] as string)) + 1));
  }

  protected quit() {
    this.recordService.clearRecord();
    this.router.navigateByUrl('main-menu');
  }

  private redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([uri])});
  }
}
