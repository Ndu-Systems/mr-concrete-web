import { Component, OnInit } from '@angular/core';
import { Supplier, UserModel } from 'src/app/_models';
import { SupplierService, AccountService } from 'src/app/_services';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MessageService, ConfirmationService, Message } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-partner',
  templateUrl: './edit-partner.component.html',
  styleUrls: ['./edit-partner.component.scss']
})
export class EditPartnerComponent implements OnInit {
  heading = 'Suppliers';
  subheading = 'Update supplier';
  supplier: Supplier;
  rForm: FormGroup;
  currentUser: UserModel;
  actionButton: any = {
    link: '/dashboard/partners',
    label: 'View Suppliers'
  };
  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private accountService: AccountService,
    private messageService: MessageService,
    private routeTo: Router
  ) { }

  ngOnInit() {

    this.supplierService.supplier.subscribe(data => { this.supplier = data; this.initForm(); });
  }
  initForm() {
    this.currentUser = this.accountService.CurrentUserValue;
    this.rForm = this.fb.group({
      EmailAddress: new FormControl(this.supplier.EmailAddress, Validators.compose([Validators.required, Validators.email])),
      SupplierName: [this.supplier.SupplierName, Validators.required],
      ContactNumber: [this.supplier.ContactNumber, Validators.required],
      SupplierAddress: [this.supplier.SupplierAddress || 'not set'],
      City: [this.supplier.City, Validators.required],
      ContactPerson: [this.supplier.ContactPerson, Validators.required],
      PostalCode: [this.supplier.PostalCode],
      CreateUserId: [this.currentUser.UserId],
      ModifyUserId: [this.currentUser.UserId],
      SupplierId: [this.supplier.SupplierId],
      StatusId: [1]
    });
  }

  onSubmit(supplier: Supplier) {
    this.supplierService.updateSupplier(supplier);
    this.messageService.add({
      severity: 'success',
      summary: `Success!`,
      detail: 'Supplier updated successfully',
      life: 1000
    });
    this.routeTo.navigate(['/dashboard/partners']);
  }
}
