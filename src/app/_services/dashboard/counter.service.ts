import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CounterModel } from 'src/app/_models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CounterService {
  private _counterModel: BehaviorSubject<CounterModel>;
  public counterModel: Observable<CounterModel>;
  url: string;
  private dataStore: {
    counter: CounterModel
  } = { counter: {

  } };
  constructor(
    private http: HttpClient,
  ) {
    this._counterModel = new BehaviorSubject<CounterModel>(JSON.parse(localStorage.getItem('counter')));
    this.counterModel = this._counterModel.asObservable();
    this.url = environment.API_URL;
  }

  getCounters() {
    return this.http.get<CounterModel>(`${this.url}/api/counters/get-counters.php`).subscribe(data => {
      const counter: CounterModel = data;
      localStorage.setItem('counter', JSON.stringify(counter));
      this._counterModel.next(counter);
    }, error => { console.log(error); });
  }

}
