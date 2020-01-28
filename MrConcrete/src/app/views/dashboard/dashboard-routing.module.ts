import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DashboardHomeComponent } from './dashboard-home';
import { DashboardNavComponent } from './dashboard-nav';


const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
    ]
  }
];
export const declarations = [
  DashboardComponent,
  DashboardHomeComponent,
  DashboardNavComponent
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
