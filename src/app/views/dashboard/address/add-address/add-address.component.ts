import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService, UserService, AccountService } from 'src/app/_services';
import { PROVINCE_LIST, ADDRESS_TYPE } from 'src/app/_shared';
import { UserModel } from 'src/app/_models';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['../address.component.scss']
})
export class AddAddressComponent implements OnInit {
  @Input() userId: string;
  rForm: FormGroup;
  currentUser: UserModel;
  provinces = PROVINCE_LIST;
  addressTypes = ADDRESS_TYPE;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,

  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      UserId: [this.userId, Validators.required],
      AddressType: [null, Validators.required],
      AddressLine1: [null, Validators.required],
      AddressLine2: [null, Validators.required],
      AddressLine3: [null],
      City: [null, Validators.required],
      Province: [null, Validators.required],
      PostalCode: [null, Validators.required],
      CrateUserId: [this.currentUser.UserId, Validators.required],
      ModifyUserId: [this.currentUser.UserId, Validators.required],
      StatusId: [1]
    });
  }


}
