import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent implements AfterViewInit {
  @ViewChild('gameAudio') protected gameAudioElement!: ElementRef;

  ngAfterViewInit(): void {
    (this.gameAudioElement.nativeElement as HTMLAudioElement).muted = true;
    (this.gameAudioElement.nativeElement as HTMLAudioElement).play();
    (this.gameAudioElement.nativeElement as HTMLAudioElement).muted = false;
  }
}
