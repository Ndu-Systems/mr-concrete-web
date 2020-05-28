import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  heading = 'Porducts';
  subheading = '';
  actionButton: any = {
    link: '/dashboard/create-product',
    label: 'Create Product'
  };
  constructor() { }

  ngOnInit() {
  }

}
