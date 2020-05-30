import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Image } from 'src/app/_models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {



  private _imagesUrlsToUpload: BehaviorSubject<string[]>;
  public imagesUrlsToUpload: Observable<string[]>;

  private _images: BehaviorSubject<Image[]>;
  public images: Observable<Image[]>;
  url: string;
  constructor(
    private http: HttpClient
  ) {

    this._imagesUrlsToUpload = new BehaviorSubject<string[]>(JSON.parse(localStorage.getItem('imagesUrlsToUpload')) || []);
    this.imagesUrlsToUpload = this._imagesUrlsToUpload.asObservable();

    this._images = new BehaviorSubject<Image[]>(JSON.parse(localStorage.getItem('images')) || []);
    this.images = this._images.asObservable();

    this.url = environment.API_URL;
  }

  public get currentImageValue(): string[] {
    return this._imagesUrlsToUpload.value;
  }
  apendUrlsToUploadState(data: any) {
    let state = this.currentImageValue;
    if (!state) {
      state = [];
    }
    state.push(data);
    this.updateUrlsToUploadState(state);
  }
  apendState(data: any) {
    let state = this._images.value;
    if (!state) {
      state = [];
    }
    state.push(data);
    this.updateState(state);
  }
  updateUrlsToUploadState(data: string[]) {
    this._imagesUrlsToUpload.next(data);
    localStorage.setItem('imagesUrlsToUpload', JSON.stringify(data));
  }
  updateState(data: Image[]) {
    this._images.next(data);
    localStorage.setItem('images', JSON.stringify(data));
  }
  clearState() {
    this.updateUrlsToUploadState(null);
  }
  addImage(data: Image) {
    return this.http.post<any>(`${this.url}/api/image/add-image.php`, data).subscribe(resp => {
      const image: Image = resp;
      this.apendState(image);

    }, error => {
    });
  }

  getImages(otherId) {
    return this.http.get<any>(`${this.url}/api/image/get-image.php?OtherId=${otherId}`).subscribe(resp => {
      const images: Image[] = resp;
      this.updateState(images);
    }, error => {
    });
  }

  update(data: Image) {
    return this.http.post<any>(`${this.url}/api/image/update-image.php`, data).subscribe(resp => {
      let state = this._images.value;
      state = state && state.filter(x => x.ImageId !== data.ImageId) || [];
      this.updateState(state);
    }, error => {
    });
  }
}
