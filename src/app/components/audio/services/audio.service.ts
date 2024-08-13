import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private isFailed: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isFailed$: Observable<boolean> = this.isFailed.asObservable();
  private isSuccess: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isSuccess$: Observable<boolean> = this.isSuccess.asObservable();
  private isFiveLevel: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public isFiveLevel$: Observable<boolean> = this.isFiveLevel.asObservable();

  public setFailed() {
    this.isFailed.next(true);
  }

  public setFailedDefault() {
    this.isFailed.next(false);
  }

  public setSuccess() {
    this.isSuccess.next(true);
  }

  public setSuccessDefault() {
    this.isFailed.next(false);
  }

  public setFiveLevel() {
    this.isFiveLevel.next(true);
  }

  public setFiveLevelDefault() {
    this.isFailed.next(false);
  }

}
