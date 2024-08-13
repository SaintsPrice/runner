import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {StartPageComponent} from "./components/start-page/start-page.component";
import {AudioComponent} from "./components/audio/audio.component";
import {Platform} from "@angular/cdk/platform";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StartPageComponent, AudioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  protected modalPwaEvent: any;
  protected modalPwaPlatform: any;

  afterClick = '';

  constructor(protected router: Router,
              protected changeDetection: ChangeDetectorRef,
              protected platform: Platform) {
  }

  ngOnInit(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }
  }

  public addToHomeScreen(): void {
    console.log('pizdec')
    this.afterClick = 'click';
    (this.modalPwaEvent).prompt();
    this.modalPwaPlatform = undefined;
    this.changeDetection.detectChanges();
  }
}
