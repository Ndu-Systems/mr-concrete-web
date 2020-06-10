import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService, UserService, AccountService, AddressService, NotificationService } from 'src/app/_services';
import { PROVINCE_LIST, ADDRESS_TYPE, Region } from 'src/app/_shared';
import { UserModel, AddressModel } from 'src/app/_models';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['../address.component.scss']
})
export class AddAddressComponent implements OnInit {
  @Input() userId: string;
  @Output()AddressModel: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();
  @Output()cancelModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  rForm: FormGroup;
  @Input() userViewModel: UserModel;
  currentUser: UserModel;
  provinces = PROVINCE_LIST;
  addressTypes = ADDRESS_TYPE;
  subRegions: Region[] = [];
   constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private addressService: AddressService,
    private messageService: NotificationService,
    private userService: UserService

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      UserId: [this.userId, Validators.required],
      AddressType: [null, Validators.required],
      AddressLine1: [null, Validators.required],
      AddressLine2: [''],
      AddressLine3: [''],
      City: [null, Validators.required],
      Province: [null, Validators.required],
      PostalCode: [null, Validators.required],
      CrateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
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

  onSubmit(model: AddressModel) {
    this.addressService.addAddress(model).subscribe(data => {
      if (data.AddressId) {
        this.close(data);
      } else {
        this.messageService.dangerMessage('Oops error', 'Something went wrong please try again later.');
        this.close(null);
      }
    });
  }

  close(addressModel: AddressModel) {
    if (this.userViewModel.Address === null
      || this.userViewModel.Address === undefined) {
      this.userViewModel.Address = [];
    }
    this.userViewModel.Address.push(addressModel);
    this.userService.updateUserViewState(this.userViewModel);
    this.AddressModel.emit(addressModel);
  }
  cancelOut() {
    this.cancelModel.emit(false);
   }

}
