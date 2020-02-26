import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule, declarations } from './home-routing.module';
import { MaterialModule } from 'src/app/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...declarations]
})
export class HomeModule { }
