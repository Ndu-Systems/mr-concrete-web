import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';
import { OrdersComponent, ListOrdersComponent, CreateOrderComponent, ViewOrderComponent } from './orders';
import { SettingsComponent } from './settings';
import { ActionsComponent, BannerComponent } from './shared';
import { PartnersComponent, CreateSupplierComponent } from './partners';
import { MeasurementsComponent, CreateMeasurementComponent } from './measurements';
import { CategoriesComponent, CreateCategoryComponent } from './categories';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'create-orders', component: CreateOrderComponent },
      { path: 'orders', component: ListOrdersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'add-partner', component: CreateSupplierComponent },
      { path: 'measurements', component: MeasurementsComponent },
      { path: 'add-measurement', component: CreateMeasurementComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-category', component: CreateCategoryComponent },
      { path: 'view-order', component: ViewOrderComponent },
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
  PartnersComponent,
  CreateSupplierComponent,
  MeasurementsComponent,
  CategoriesComponent,
  CreateCategoryComponent,
  CreateMeasurementComponent,
  ViewOrderComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
