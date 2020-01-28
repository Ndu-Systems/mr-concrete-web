import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
  ],
  declarations: [...declarations]
})
export class DashboardModule { }
