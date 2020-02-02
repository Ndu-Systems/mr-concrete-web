import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';
import { OrdersComponent, ListOrdersComponent, CreateOrderComponent } from './orders';
import { SettingsComponent } from './settings';
import { ActionsComponent, BannerComponent } from './shared';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'create-orders', component: CreateOrderComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];
export const declarations = [
  DashboardComponent,
  DashboardHomeComponent,
  DashboardNavComponent,
  OrdersComponent,
  ListOrdersComponent,
  CreateOrderComponent,
  SettingsComponent,
  BannerComponent,
  ActionsComponent,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
