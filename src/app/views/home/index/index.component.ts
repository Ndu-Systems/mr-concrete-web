import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsModel } from 'src/app/_models';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  rForm: FormGroup;
  constructor(
    private fb: FormBuilder,
  ) { }
  error;
  ngOnInit() {
    this.rForm = this.fb.group({
      FullName: [null, Validators.required],
      Email: [null],
      PhoneNumber: [null, Validators.required],
      Message: [null, Validators.required],
    });
  }
  onSubmit(model: ContactUsModel) {
    console.log('contact us form', model);
  }
}
