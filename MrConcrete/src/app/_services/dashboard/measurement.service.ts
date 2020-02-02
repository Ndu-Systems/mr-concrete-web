import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Measurement } from 'src/app/_models';

@Injectable({
  providedIn: 'root'
})
export class MeasurementService {

  private _measurements: BehaviorSubject<Measurement[]>;
  public measurements: Observable<Measurement[]>;
  url: string;

  private dataStore: {
    measurements: Measurement[]
  } = { measurements: [] };

  private _measurement: BehaviorSubject<Measurement>;
  public measurement: Observable<Measurement>;

  constructor(
    private http: HttpClient,
  ) {
    this._measurements = new BehaviorSubject<Measurement[]>(JSON.parse(localStorage.getItem('measurements')) || []);
    this.measurements = this._measurements.asObservable();
    this.url = environment.API_URL;
    this._measurement = new BehaviorSubject<Measurement>(JSON.parse(localStorage.getItem('measurement')));
    this.measurement = this._measurement.asObservable();
  }

  public get measurementsValue(): Measurement[] {
    return this._measurements.value;
  }
  apendState(data: Measurement) {
    const state = this.measurementsValue || [];
    state.push(data);
    this._measurements.next(state);
  }

  updateCurrentMeasurement(measurement: Measurement) {
    this._measurement.next(measurement);
    localStorage.setItem('measurement', JSON.stringify(measurement));
  }

  removeCurrentMeasurement() {
    localStorage.removeItem('measurement');
  }
  addMeasurement(data: Measurement) {
    return this.http.post<any>(`${this.url}/api/catergory/add-catergory.php`, data).subscribe(resp => {
      const measurement: Measurement = resp;
      this.apendState(measurement);
    }, error => {
      console.log(error);
    });
  }

  updateMeasurement(measurement: Measurement) {
    this.http.put<Measurement>(`${this.url}/api/catergory/edit-catergory.php`, JSON.stringify(measurement))
      .subscribe(data => {
        this.dataStore.measurements.forEach((item, index) => {
          if (item.CatergoryId === data.CatergoryId) {
            this.dataStore.measurements[index] = data;
          }
        });
        this.dataStore.measurements.sort((x, y) => {
          return new Date(y.CreateDate).getTime() - new Date(x.CreateDate).getTime();
        });
        this._measurements.next(Object.assign({}, this.dataStore).measurements);
      }, error => console.log('Could not update Measurement'));
  }

  getMeasurements(companyId) {
    return this.http.get<Measurement[]>(`${this.url}/api/measurement/get-measurements.php?CompanyId=${companyId}`).subscribe(resp => {
      const measurement: Measurement[] = resp;
      localStorage.setItem('measurements', JSON.stringify(measurement));
      this._measurements.next(measurement);
      this.dataStore.measurements = resp;
      this._measurements.next(Object.assign({}, this.dataStore).measurements);
    }, error => {
      console.log(error);
    });
  }


}
