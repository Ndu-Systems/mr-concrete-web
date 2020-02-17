import { ConfirmationService, Message } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models';
import { SupplierService } from 'src/app/_services';
import { ActionButton } from '../shared/constants/actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent implements OnInit {
  heading = 'Settings';
  subheading = 'Suppliers';
  suppliers: Supplier[] = [];
  actionButton: ActionButton = {
    link: '/dashboard/add-partner',
    label: 'add supplier'
  };

  msgs: Message[] = [];

  constructor(
    private supplierService: SupplierService,
    private routeTo: Router,
    private confirmationService: ConfirmationService

  ) { }

  ngOnInit() {
    this.suppliers = this.supplierService.suppliersValue;
    this.supplierService.getSuppliers(1);
  }

  updatePartner(supplier: Supplier) {
    this.supplierService.updateCurrentSupplier(supplier);
    this.routeTo.navigate(['/dashboard/update-partner']);
  }

  archivePartner() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'You have rejected' }];
      }
    });
  }

}
