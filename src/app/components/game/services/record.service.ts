import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  private _record = 0;

  get record(): number {
    return this._record;
  }

  public increaseRecord() {
    this._record += 1;
  }

  public clearRecord() {
    const localRecord = localStorage.getItem('record')

    if(!localRecord) {
      localStorage.setItem('record', this._record.toString());
    }

    if(localRecord && parseInt(localRecord) < this._record) {
      localStorage.setItem('record', this._record.toString());
    }
    this._record = 0;
  }
}
