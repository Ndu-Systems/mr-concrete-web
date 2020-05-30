import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent, RecentOrdersComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';
import {
  OrdersComponent,
  ListOrdersComponent,
  CreateOrderComponent,
  ViewOrderComponent,
  SupplierListOrdersComponent
} from './orders';
import { SettingsComponent } from './settings';
import { ActionsComponent, BannerComponent, StatsComponent, BannerTutorialComponent } from './shared';
import { PartnersComponent, CreateSupplierComponent } from './partners';
import { MeasurementsComponent, CreateMeasurementComponent, EditMeasurementComponent } from './measurements';
import { CategoriesComponent, CreateCategoryComponent, EditCategoryComponent } from './categories';
import { MeasurenamePipe } from 'src/app/_pipes/measurename.pipe';
import { OutcomeComponent } from './shared/outcome/outcome.component';
import { EditPartnerComponent } from './partners/edit-partner';
import { PlaceholderComponent } from './shared/placeholder';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';
import { DashboardSideNavComponent } from './dashboard-side-nav';
import { UserProfileComponent, CreatePersonaComponent } from './user-profile';
import { UserDpComponent } from './user-profile/user-dp';
import { ListProductsComponent, CreateProductComponent, UpdateProductComponent } from './products';
import { ProductImagesComponent } from './products/product-images/product-images.component';
import { FileUploadComponent } from './products/file-upload/file-upload.component';
import { EmployeesComponent } from './employees';
import { CartViewComponent } from './orders/cart-view/cart-view.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      { path: 'create-orders', component: CreateOrderComponent },
      { path: 'update-order', component: UpdateOrderComponent },
      { path: 'orders', component: ListOrdersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'partners', component: PartnersComponent },
      { path: 'add-partner', component: CreateSupplierComponent },
      { path: 'update-partner', component: EditPartnerComponent },
      { path: 'measurements', component: MeasurementsComponent },
      { path: 'add-measurement', component: CreateMeasurementComponent },
      { path: 'edit-measurement', component: EditMeasurementComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'add-category', component: CreateCategoryComponent },
      { path: 'edit-category', component: EditCategoryComponent },
      { path: 'view-order', component: ViewOrderComponent },
      { path: 'outcome', component: OutcomeComponent },
      { path: 'products', component: ListProductsComponent },
      { path: 'create-product', component: CreateProductComponent },
      { path: 'edit-product', component: UpdateProductComponent },
      { path: 'employees', component: EmployeesComponent }
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
  EditPartnerComponent,
  MeasurementsComponent,
  CategoriesComponent,
  CreateCategoryComponent,
  CreateMeasurementComponent,
  ViewOrderComponent,
  SupplierListOrdersComponent,
  OutcomeComponent,
  EditMeasurementComponent,
  EditCategoryComponent,
  StatsComponent,
  PlaceholderComponent,
  UpdateOrderComponent,
  RecentOrdersComponent,
  DashboardSideNavComponent,
  UserProfileComponent,
  UserDpComponent,
  ListProductsComponent,
  CreateProductComponent,
  ProductImagesComponent,
  FileUploadComponent,
  EmployeesComponent,
  BannerTutorialComponent,
  CreatePersonaComponent,
  UpdateProductComponent,
  CartViewComponent,
  // Pipes
  MeasurenamePipe,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
