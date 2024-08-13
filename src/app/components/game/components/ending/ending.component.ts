import {ChangeDetectorRef, Component} from '@angular/core';
import {RecordService} from "../../services/record.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ending',
  standalone: true,
  imports: [],
  templateUrl: './ending.component.html',
  styleUrl: './ending.component.scss'
})
export class EndingComponent {
  protected isEnding: boolean = false;

  constructor(private changeDetection: ChangeDetectorRef,
              protected router: Router,
              protected recordService: RecordService) {
  }

  protected handleVideoEnd() {
    this.isEnding = true;
    this.changeDetection.markForCheck();
  }
}
