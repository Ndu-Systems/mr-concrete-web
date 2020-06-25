import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService, AccountService, ApiService, NotificationService } from 'src/app/_services';
import { Region, PROVINCE_LIST, COMPANY_TYPES_LIST } from 'src/app/_shared';
import { NavigationModel, CompanyModel, UserModel, CompanyQueryModel } from 'src/app/_models';

@Component({
  selector: 'app-add-company-shared',
  templateUrl: './add-company-shared.component.html',
  styleUrls: ['../../companies.component.scss']
})
export class AddCompanySharedComponent implements OnInit {
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter();

  rForm: FormGroup;
  currentUser: UserModel;
  companyView: CompanyModel;
  nav: NavigationModel;
  showModal: boolean;
  showUpdateModal: boolean;
  companyTypes = COMPANY_TYPES_LIST;
  provinces = PROVINCE_LIST;
  subRegions: Region[] = [];
  actionButton: any = {
    link: '/dashboard/edit-company',
    label: 'Edit company'
  };
  constructor(
    private accountService: AccountService,
    private companyService: CompanyService,
    private fb: FormBuilder,
    private apiService: ApiService,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.nav = this.apiService.CurrentNav;
    this.currentUser = this.accountService.CurrentUserValue;
    this.companyView = this.companyService.CurrentCompanyValue;
    this.rForm = this.fb.group({
      CompanyEmail: new FormControl(
        null,
        Validators.compose([
          Validators.required,
          Validators.email])),
      CompanyName: [null, Validators.required],
      CompanyPhone: [null, Validators.required],
      ParentId: [this.currentUser.CompanyId],
      CompanyAddress: [null, Validators.required],
      Province: [null],
      CompanyType: [null, Validators.required],
      City: [null, Validators.required],
      PostalCode: [''],
      CreateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      IsDeleted: [false],
      StatusId: [1]
    });
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
    this.companyService.addCompany(model).subscribe(data => {
      if (data.CompanyId) {
        this.messageService.successMassage('Company created successfully', 'No action required');

        const qry: CompanyQueryModel = {
          CompanyId: this.currentUser.CompanyId,
          StatusId: '1',
          IsDeleted: false
        };
        this.companyService.getById(qry);
        const existingCompany = this.companyService.CurrentCompanyValue;
        if (!existingCompany.SubBranches) {
          existingCompany.SubBranches = [];
        }
        existingCompany.SubBranches.push(data);
        this.companyService.updateCompanyState(existingCompany);
        this.closeModal.emit(false);
      }
    });
  }

  cancel() {
    this.closeModal.emit(false);
  }

}
