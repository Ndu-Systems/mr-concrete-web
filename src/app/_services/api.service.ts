import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../_models';

// THIS IS TESTING FOR PWA ** FOR LEARNING PURPOSES ONLY **

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiUrl = 'https://www.techiediaries.com/api/data.json';
  constructor(private http: HttpClient) { }

  get(): Observable<Item[]> {
    return this.http.get(this.apiUrl) as Observable<Item[]>;
  }

}
