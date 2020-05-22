import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CounterModel, SettingCounterModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _counterModel: BehaviorSubject<CounterModel>;
  private _settingCounterModel: BehaviorSubject<SettingCounterModel>;
  public counterModel: Observable<CounterModel>;
  public settingCounterModel: Observable<SettingCounterModel>;
  url: string;
  private dataStore: {
    counter: CounterModel,
    settingCounter: SettingCounterModel
  } =
    {
      counter: {},
      settingCounter: {}
    };
  constructor(
    private http: HttpClient,
  ) {
    this._counterModel = new BehaviorSubject<CounterModel>(JSON.parse(localStorage.getItem('counter')));
    this.counterModel = this._counterModel.asObservable();
    this._settingCounterModel = new BehaviorSubject<SettingCounterModel>(JSON.parse(localStorage.getItem('settingCounter')));
    this.settingCounterModel = this._settingCounterModel.asObservable();
    this.url = environment.API_URL;
  }

  getCounters() {
    return this.http.get<CounterModel>(`${this.url}/api/counters/get-counters.php`).subscribe(data => {
      const counter: CounterModel = data;
      localStorage.setItem('counter', JSON.stringify(counter));
      this._counterModel.next(counter);
    }, error => { console.log(error); });
  }

  getSettingCounters() {
    return this.http.get<SettingCounterModel>(`${this.url}/api/counters/get-setting-counters.php`).subscribe(data => {
      const counter: SettingCounterModel = data;
      localStorage.setItem('settingCounter', JSON.stringify(counter));
      this._settingCounterModel.next(counter);
    }, error => { console.log(error); });
  }

}
