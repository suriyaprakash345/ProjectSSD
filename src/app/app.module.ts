import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { Login1Component } from './login1/login1.component';
import { Login2Component } from './login2/login2.component';
import { Login3Component } from './login3/login3.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import {InputTextModule} from 'primeng/inputtext';
import { LoginPageComponent } from './login-page/login-page.component';
import {HttpClientModule} from '@angular/common/http';
import { PageNotComponent } from './page-not/page-not.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import {ButtonModule} from 'primeng/button';
import { SetPasswordComponent } from './set-password/set-password.component';
import { FormComponent } from './form/form.component';
import { CardsComponent } from './cards/cards.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Login1Component,
    Login2Component,
    Login3Component,
    ForgetPasswordPageComponent,
    LoginPageComponent,
    PageNotComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SignupComponent,
    VerifyComponent,
    SetPasswordComponent,
    FormComponent,
    CardsComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
