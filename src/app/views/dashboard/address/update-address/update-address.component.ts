import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AddressModel, UserModel } from 'src/app/_models';
import { AddressService, AccountService, NotificationService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PROVINCE_LIST, ADDRESS_TYPE, Region } from 'src/app/_shared';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['../address.component.scss']
})
export class UpdateAddressComponent implements OnInit {
  @Input() addressModel: AddressModel;
  @Output()AddressModel: EventEmitter<AddressModel> = new EventEmitter<AddressModel>();
  @Output()cancelModel: EventEmitter<boolean> = new EventEmitter<boolean>();
  rForm: FormGroup;
  currentUser: UserModel;
  provinces = PROVINCE_LIST;
  addressTypes = ADDRESS_TYPE;
  subRegions: Region[] = [];

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private addressService: AddressService,
    private messageService: NotificationService
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      UserId: [this.addressModel.UserId, Validators.required],
      AddressType: [this.addressModel.AddressType, Validators.required],
      AddressLine1: [this.addressModel.AddressLine1, Validators.required],
      AddressLine2: [this.addressModel.AddressLine2],
      AddressLine3: [this.addressModel.AddressLine3],
      City: [this.addressModel.City, Validators.required],
      Province: [this.addressModel.Province, Validators.required],
      PostalCode: [this.addressModel.PostalCode, Validators.required],
      CrateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [this.addressModel.StatusId]
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
    this.addressService.updateAddress(model).subscribe(data => {
      if (data.AddressId) {
        this.close(data);
      } else {
        this.messageService.dangerMessage('Oops error', 'Something went wrong please try again later.');
        this.close(null);
      }
    });
  }
  close(addressModel: AddressModel) {
    this.AddressModel.emit(addressModel);
  }
  cancelOut() {
    this.cancelModel.emit(false);
   }

}
