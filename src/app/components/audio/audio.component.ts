import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import {AudioService} from "./services/audio.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-audio',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './audio.component.html',
  styleUrl: './audio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioComponent implements AfterViewInit {
  @ViewChild('gameAudio') protected gameAudioElement!: ElementRef;
  @ViewChild('fiveLevelAudio') protected fiveLevelAudioElement!: ElementRef;
  protected audioIndex: number = 1;
  protected audioSrc: string = `audio/${this.audioIndex}.mp3`;

  protected audioFiveLevelIndex = 1;
  protected audioFiveLevelSrc = `audio/phonk-${this.audioFiveLevelIndex}.mp3`;

  constructor(protected audioService: AudioService) {
  }

  ngAfterViewInit(): void {
    this.playSound();
  }

  protected nextSong() {
    if (this.audioIndex === 7) {
      this.audioIndex = 1;
    } else {
      this.audioIndex += 1;
      this.audioSrc = `audio/${this.audioIndex}.mp3`;
    }
  }

  protected nextFiveLeveSong() {
    if (this.audioFiveLevelIndex === 5) {
      this.audioFiveLevelIndex = 1;
    } else {
      this.audioFiveLevelIndex += 1;
      this.audioFiveLevelSrc = `audio/phonk-${this.audioFiveLevelIndex}.mp3`;
    }
  }

  private playSound() {
    (this.gameAudioElement?.nativeElement as HTMLAudioElement).play();
  }
}
