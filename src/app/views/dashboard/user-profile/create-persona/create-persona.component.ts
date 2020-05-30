import { PROVINCE_LIST, Region } from './../../../../_shared/constants';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { PERSONA_LIST } from 'src/app/_shared';
import { CompanyModel } from 'src/app/_models/Company.model';
import { AccountService, NotificationService } from 'src/app/_services';
import { UserModel } from 'src/app/_models';
import { CompanyService } from 'src/app/_services/dashboard/company.service';

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
  user: UserModel;
  selected;
  showCompleteProfileForm: boolean;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private companyService: CompanyService,
    private messageService: NotificationService
  ) { }


  ngOnInit() {
    this.user = this.accountService.CurrentUserValue;
    if (this.user.CompanyId === null ||
      this.user.CompanyId === undefined) {
      this.showCompleteProfileForm = true;
    }
    this.rForm = this.fb.group({
      CompanyName: [null, Validators.required],
      CompanyPhone: [null, Validators.required],
      CompanyAddress: [null, Validators.required],
      City: [null, Validators.required],
      PostalCode: [null, Validators.required],
      Province: [null],
      CompanyLink: [null],
      personaType: [null, Validators.required],
      IsDeleted: [false],
      CreateUserId: [this.user.UserId],
      ModifyUserId: [this.user.UserId],
      CompanyEmail: [''],
      ParentId: [this.user.CompanyId],
      StatusId: [1],
      CompanyType: ['HeadQuarter']
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

  onProvinceSelect(parentId) {
    this.loadSubRegions();
    this.subRegions = this.subRegions.filter(x => x.parentId === parentId);
  }

  onSubmit(model: CompanyModel) {
    // code service api
    let provinceName = this.provinces.find(x => x.id = model.Province);
    console.log(provinceName);
    this.companyService.addCompany(model).subscribe(data => {
      if (data.CompanyId) {
        this.messageService.successMassage('Company created successfully', 'No action required');
      }
    });

  }
}
