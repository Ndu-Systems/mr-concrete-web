import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule, declarations } from './home-routing.module';
import { MaterialModule } from 'src/app/material';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  declarations: [...declarations]
})
export class HomeModule { }
