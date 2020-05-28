
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav';
import { IndexComponent } from './index/index.component';
import { MaterialSectionComponent } from './index/material-section';
import { CommitmentSectionComponent } from './index/commitment-section';
import { FooterComponent } from './footer';
import { SignUpComponent, SignInComponent, ForgotPasswordComponent } from './account';
import { ResetPasswordComponent } from './account/reset-password';



const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: SignInComponent },
      { path: 'register', component: SignUpComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
    ]
  }
];

export const declarations = [
  IndexComponent,
  HomeComponent,
  HomeNavComponent,
  MaterialSectionComponent,
  CommitmentSectionComponent,
  FooterComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
