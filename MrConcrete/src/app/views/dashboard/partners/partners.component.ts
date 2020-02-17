import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  position: string;
  actionButton: ActionButton = {
    link: '/dashboard/add-partner',
    label: 'add supplier'
  };
  @Output() messages: EventEmitter<Message[]> = new EventEmitter<Message[]>();
  msgs: Message[] = [];

  constructor(
    private supplierService: SupplierService,
    private routeTo: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.supplierService.getSuppliers(1);
    this.supplierService.suppliers.subscribe(data => this.suppliers = data);
  }

  updatePartner(supplier: Supplier) {
    this.supplierService.updateCurrentSupplier(supplier);
    this.routeTo.navigate(['/dashboard/update-partner']);
  }

  archivePartner(supplier: Supplier) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation Action',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        supplier.StatusId = '2';
        this.supplierService.updateSupplier(supplier);
        this.msgs = [{ severity: 'warn', summary: 'Confirmed', detail: 'Supplier successfully archived.' }];
      },
      reject: () => {
        this.msgs = [{ severity: 'info', summary: 'Rejected', detail: 'Have rejected the archive action' }];
      }
    });
  }



}
