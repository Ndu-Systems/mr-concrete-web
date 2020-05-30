import { Component, OnInit, Input, HostListener, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

import { UserModel, Image } from 'src/app/_models';
import { MessageService } from 'primeng/api';
import { DocumentsService } from 'src/app/_services/dashboard/documents.service';
import { UploadService } from 'src/app/_services/dashboard/upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FileUploadComponent),
    multi: true
  }
  ]
})
export class FileUploadComponent implements ControlValueAccessor {



  private files: FileList | null = null;
  message: string;
  imagePath: any;
  imgURL: any[] = [];

  user: UserModel;
  productId;
  fileOfBlob: File;
  // onChange: () => void;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const files = event && event;
    this.files = files;
    this.uplaodFile();

  }

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private documentsService: DocumentsService,
    private uploadService: UploadService
  ) {
  }
  writeValue(obj: any): void {
    this.files = obj ? obj : undefined;
  }

  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
  }

  uplaodFile() {
    if (!this.files.length) {
      this.message = 'Please select the files!';
      return false;
    }

    Array.from(this.files).forEach(file => {
      this.cropImage(file);

    });

  }

  cropImage(file) {
    if (file.type.match(/image.*/)) {
      console.log('An image has been loaded');

      const reader = new FileReader();
      reader.onload = (readerEvent: any) => {
        const image = new Image();
        image.onload = (imageEvent) => {

          // Resize the image
          const canvas = document.createElement('canvas');
          const maxSize = 544; // TODO : pull max size from a site config
          let width = image.width;
          let height = image.height;
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext('2d').drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg');
          const resizedImage = this.dataURLToBlob(dataUrl);
          this.fileOfBlob = new File([resizedImage], 'mrk.jpg');
          // upload
          const formData = new FormData();
          formData.append('file', this.fileOfBlob);
          formData.append('name', 'mrk');
          this.documentsService.uploadFile(formData).subscribe(response => {
            this.imgURL.push(`${environment.API_URL}/api/upload/${response}`);
            this.uploadService.updateUrlsToUploadState(this.imgURL);
            console.log(response);
          });

        };
        image.src = readerEvent.target.result.toString();
      };
      reader.readAsDataURL(file);
    }
  }
  dataURLToBlob(dataURL) {
    const BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      // tslint:disable-next-line: no-shadowed-variable
      const parts = dataURL.split(',');
      // tslint:disable-next-line: no-shadowed-variable
      const contentType = parts[0].split(':')[1];
      // tslint:disable-next-line: no-shadowed-variable
      const raw = parts[1];

      return new Blob([raw], { type: contentType });
    }

    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;

    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }
}
