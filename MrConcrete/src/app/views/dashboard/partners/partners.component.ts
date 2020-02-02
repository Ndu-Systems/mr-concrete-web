import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/_models';
import { SupplierService } from 'src/app/_services';
import { ActionButton } from '../shared/constants/actions';

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
  constructor(
    private supplierService: SupplierService
  ) { }

  ngOnInit() {
    this.suppliers = this.supplierService.suppliersValue;
    this.supplierService.getSuppliers();
  }

}
