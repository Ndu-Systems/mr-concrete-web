
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav';
import { IndexComponent } from './index/index.component';
import { MaterialSectionComponent } from './index/material-section';
import { CommitmentSectionComponent } from './index/commitment-section';
import { FooterComponent } from './footer';



const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
    ]
  }
];

export const declarations = [
  IndexComponent,
  HomeComponent,
  HomeNavComponent,
  MaterialSectionComponent,
  CommitmentSectionComponent,
  FooterComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
