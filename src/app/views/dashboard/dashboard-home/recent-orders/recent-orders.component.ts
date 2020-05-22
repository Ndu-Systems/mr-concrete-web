import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { OrderView } from 'src/app/_models/orderview.model';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss']
})
export class RecentOrdersComponent implements OnInit {
  @Input() orderList: OrderView[] = [];

  displayedColumns: string[] = ['OrderNumber', 'ProjectCode', 'Category', 'DeliveryDate', 'Supplier'];
  orders = (JSON.parse(localStorage.getItem('orders')) || []) as OrderView[];
  dataSource = new MatTableDataSource<OrderView>(this.orders);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() {
   }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
   }

}
