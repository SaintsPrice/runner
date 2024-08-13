import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-records',
  standalone: true,
  imports: [],
  templateUrl: './records.component.html',
  styleUrl: './records.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecordsComponent {
  public record: string = localStorage.getItem('record') ?? '0';

  constructor(protected router: Router) {
  }
}
