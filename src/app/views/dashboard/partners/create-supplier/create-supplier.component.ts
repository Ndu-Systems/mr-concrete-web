import { MessageService } from 'primeng/api';
import { AccountService, SupplierService } from 'src/app/_services';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserModel, Supplier } from 'src/app/_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-supplier',
  templateUrl: './create-supplier.component.html',
  styleUrls: ['../partners.component.scss']
})
export class CreateSupplierComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Add a new supplier';
  rForm: FormGroup;
  error: string;
  currentUser: UserModel;
  actionButton: any = {
    link: '/dashboard/partners',
    label: 'View Suppliers'
  };
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private supplierService: SupplierService,
    private messageService: MessageService,
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
  onSubmit(partner: UserModel) {
    console.log('user to add ', partner);
  }

  goBack() {
    this.routeTo.navigate(['/dashboard/partners']);
  }
}
