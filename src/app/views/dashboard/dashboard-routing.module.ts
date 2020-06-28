import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent, RecentOrdersComponent, DriverDashboardHomeComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';
import {
  OrdersComponent,
  ListOrdersComponent,
  CreateOrderComponent,
  ViewOrderComponent,
  SupplierListOrdersComponent
} from './orders';
import { SettingsComponent } from './settings';
import {
  ActionsComponent,
  BannerComponent,
  StatsComponent,
  BannerTutorialComponent,
  SetUpProgressComponent,
  ActionCardComponent,
  ConfirmDialogComponent
} from './shared';
import {
  PartnersComponent,
  CreateSupplierComponent,
  ListPartnersComponent,
  CreatePartnerComponent,
  ViewPartnerComponent
} from './partners';
import {
  MeasurementsComponent,
  CreateMeasurementComponent,
  EditMeasurementComponent
} from './measurements';
import {
  CategoriesComponent,
  CreateCategoryComponent,
  EditCategoryComponent
} from './categories';
import { MeasurenamePipe } from 'src/app/_pipes/measurename.pipe';
import { OutcomeComponent } from './shared/outcome/outcome.component';
import { EditPartnerComponent } from './partners/edit-partner';
import { PlaceholderComponent } from './shared/placeholder';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';
import { DashboardSideNavComponent } from './dashboard-side-nav';
import {
  UserProfileComponent,
  CreatePersonaComponent,
  ChangePasswordComponent,
  UpdateProfileComponent
} from './user-profile';
import { UserDpComponent } from './user-profile/user-dp';
import {
  ListProductsComponent,
  CreateProductComponent,
  UpdateProductComponent
} from './products';
import { ProductImagesComponent } from './products/product-images/product-images.component';
import { FileUploadComponent } from './products/file-upload/file-upload.component';
import {
  EmployeesComponent,
  AddEmployeeComponent,
  UpdateEmployeeComponent,
  ViewEmployeeComponent
} from './employees';
import { CartViewComponent } from './orders/cart-view/cart-view.component';
import {
  CompaniesComponent,
  ListCompaniesComponent,
  EditCompanyComponent,
  AddCompanyComponent,
  ViewCompanyComponent,
  AddCompanySharedComponent
} from './companies';
import { FormatOrderproductPipeCustomer } from 'src/app/_pipes/format-dashboard-options.pipe-customer';
import {
  AddressComponent,
  AddAddressComponent,
  UpdateAddressComponent
} from './address';
import { CartDetailedComponent } from './orders/cart-detailed/cart-detailed.component';
import { CreateCustomerOrderComponent } from './orders/create-customer-order/create-customer-order.component';
import { SelectSupplierComponent } from './orders/create-customer-order/select-supplier/select-supplier.component';
import { DeliveriesComponent, AddDeliveryComponent, EditDeliveryComponent, ListDeliveriesComponent, DeliveryDetailsComponent } from './deliveries';


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
      { path: 'add-partner', component: CreatePartnerComponent },
      { path: 'view-partner', component: ViewPartnerComponent },
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
      { path: 'employees', component: EmployeesComponent },
      { path: 'add-employee', component: AddEmployeeComponent },
      { path: 'view-employee', component: ViewEmployeeComponent },
      { path: 'edit-employee', component: UpdateEmployeeComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: 'update-profile', component: UpdateProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'companies', component: CompaniesComponent },
      { path: 'view-company', component: ViewCompanyComponent },
      { path: 'add-company', component: AddCompanyComponent },
      { path: 'edit-company', component: EditCompanyComponent },
      { path: 'create-customer-order', component: CreateCustomerOrderComponent },
      { path: 'deliveries', component: DeliveriesComponent },
      { path: 'delivery-details', component: DeliveryDetailsComponent },
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
  SetUpProgressComponent,
  CompaniesComponent,
  ChangePasswordComponent,
  UpdateProfileComponent,
  ActionCardComponent,
  AddEmployeeComponent,
  UpdateEmployeeComponent,
  ListPartnersComponent,
  CreatePartnerComponent,
  AddressComponent,
  AddAddressComponent,
  UpdateAddressComponent,
  ViewEmployeeComponent,
  CartDetailedComponent,
  ViewPartnerComponent,
  ListCompaniesComponent,
  EditCompanyComponent,
  AddCompanyComponent,
  ViewCompanyComponent,
  AddCompanySharedComponent,
  ConfirmDialogComponent,
  CreateCustomerOrderComponent,
  SelectSupplierComponent,
  DeliveriesComponent,
  AddDeliveryComponent,
  EditDeliveryComponent,
  ListDeliveriesComponent,
  DriverDashboardHomeComponent,
  DeliveryDetailsComponent,
  // Pipes
  MeasurenamePipe,
  FormatOrderproductPipeCustomer,
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
