import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';
import { OrdersComponent, ListOrdersComponent, CreateOrderComponent } from './orders';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'orders', component: OrdersComponent },
    ]
  }
];
export const declarations = [
  DashboardComponent,
  DashboardHomeComponent,
  DashboardNavComponent,
  OrdersComponent,
  ListOrdersComponent,
  CreateOrderComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
