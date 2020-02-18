import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule, declarations } from './dashboard-routing.module';
import { MaterialModule } from 'src/app/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...declarations]
})
export class DashboardModule { }
