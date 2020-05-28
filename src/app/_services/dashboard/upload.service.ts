import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {



  private _images: BehaviorSubject<string[]>;
  public images: Observable<string[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {
    this._images = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem('images')) || []);
    this.images = this._images.asObservable();
    this.url = environment.API_URL;
  }

  public get currentImageValue(): string[] {
    return this._images.value;
  }
  apendState(data: any) {
    let state = this.currentImageValue;
    if (!state) {
      state = [];
    }
    state.push(data);
    this.updateState(state);
  }
  updateState(data: string[]) {
    this._images.next(data);
    localStorage.setItem('images', JSON.stringify(data));
  }
  clearState() {
    this.updateState(null);
  }
  addImage(data: Image) {
    return this.http.post<any>(`${this.url}/api/image/add-image.php`, data).subscribe(resp => {
      const image: Image = resp;
      this.apendState(image);

    }, error => {
    });
  }
}
