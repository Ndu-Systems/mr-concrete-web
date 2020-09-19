import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocaleIndexService {

  constructor(private httpClient: HttpClient) { }

  getAdvantages(): Observable<any[]> {
    return this.httpClient.get<any[]>('assets/data-services/advantages.json').pipe(map(response => {
      return response;
    }));
  }

}
