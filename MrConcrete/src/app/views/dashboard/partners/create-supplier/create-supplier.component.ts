import { AccountService, SupplierService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel, Supplier } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['./create-supplier.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Add a new supplier';
  rForm: FormGroup;
  error: string;
  currentUser: UserModel;
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private supplierService: SupplierService,
    private routeTo: Router
  ) { }

  ngOnInit() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      EmailAddress: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      SupplierName: [null, Validators.required],
      ContactNumber: [null, Validators.required],
      SupplierAddress: ['not-set'],
      City: [null, Validators.required],
      ContactPerson: [null, Validators.required],
      PostalCode: [null],
      CreateUserId: [this.currentUser.UserId],
      ModifyUserId: [this.currentUser.UserId],
      StatusId: [1]
    });
  }
  onSubmit(supplier: Supplier) {
    this.supplierService.addSupplier(supplier);
    this.supplierService.getSuppliers();
    this.routeTo.navigate(['/dashboard/partners']);
  }
}
