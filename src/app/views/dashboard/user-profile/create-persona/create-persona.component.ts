import { PROVINCE_LIST, Region } from './../../../../_shared/constants';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PERSONA_LIST } from 'src/app/_shared';
import { CompanyModel } from 'src/app/_models/Company.model';

@Component({
  selector: 'app-create-persona',
  templateUrl: './create-persona.component.html',
  styleUrls: ['../user-profile.component.scss']
})
export class CreatePersonaComponent implements OnInit {
  rForm: FormGroup;
  error: string;
  personas = PERSONA_LIST;
  provinces = PROVINCE_LIST;
  subRegions: Region[] = [];
  constructor(
    private fb: FormBuilder,
  ) { }


  ngOnInit() {
    this.rForm = this.fb.group({
      CompanyName: [null, Validators.required],
      CompanyPhone: [null, Validators.required],
      CompanyAddress: [null, Validators.required],
      City: [null, Validators.required],
      PostalCode: [null, Validators.required],
      Province: [null],
      CompanyLink: [null],
      personaTYpe: [null, Validators.required],
    });
    this.loadSubRegions();
  }

  loadSubRegions() {
    this.provinces.forEach(item => {
      item.subRegions.forEach(sub => {
        this.subRegions.push(sub);
      });
    });
  }

  onSelect(parentId) {
   }
  onSubmit(model: CompanyModel) {
    // code service api
   }
}
