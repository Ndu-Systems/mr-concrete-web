
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeNavComponent } from './home-nav';
import { IndexComponent } from './index/index.component';

import { FooterComponent } from './footer';
import { SignUpComponent, SignInComponent, ForgotPasswordComponent } from './account';
import { ResetPasswordComponent } from './account/reset-password';
import { HomeHeadingComponent, InfoCardComponent, PillsComponent, SearchToolbarComponent } from './shared';
import { ContactUsComponent } from './contact-us';



const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'contact-us', component: ContactUsComponent },
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
  FooterComponent,
  SignInComponent,
  SignUpComponent,
  ForgotPasswordComponent,
  ResetPasswordComponent,
  SearchToolbarComponent,
  ContactUsComponent,
  PillsComponent,
  HomeHeadingComponent,
  InfoCardComponent
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
