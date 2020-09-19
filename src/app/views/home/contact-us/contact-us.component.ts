import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  heading = 'Contact us today';
  rForm: FormGroup;
  errors: string[] = [];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.rForm = this.fb.group({
      FirstName: [null, Validators.required],
      Surname: [null, Validators.required],
      Email: [null],
      PhoneNumber: [null, Validators.required],
      Message: [null, Validators.required],
    });
  }
  clearForm() {
    this.rForm.reset();
  }

}
