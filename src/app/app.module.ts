import { NgModule,OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { Login1Component } from './login1/login1.component';
import { Login2Component } from './login2/login2.component';
import { Login3Component } from './login3/login3.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { InputTextModule } from 'primeng/inputtext';
import { LoginPageComponent } from './login-page/login-page.component';
import { HttpClientModule } from '@angular/common/http';
import { PageNotComponent } from './page-not/page-not.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AddEmployyeComponent } from './add-employye/add-employye.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { EmpSetPassComponent } from './emp-set-pass/emp-set-pass.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'primeng/tooltip';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpBucketListComponent } from './emp-bucket-list/emp-bucket-list.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import {CardModule} from 'primeng/card';

import {SidebarModule} from 'primeng/sidebar';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
                //api


import { FormComponent } from './form/form.component';
import { ListuserComponent } from './listuser/listuser.component';


import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TabMenuModule} from 'primeng/tabmenu';


const ngx:NgxUiLoaderConfig =
{
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "ball-spin-clockwise",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "red",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "ball-spin-clockwise",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 120,
  "logoUrl": "",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "red",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}
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
    AddEmployyeComponent,
    VerifyEmployeeComponent,
    EmpSetPassComponent,
    EmpLoginComponent,
    EmpHomeComponent,
    EmpBucketListComponent,
    UserHomeComponent,
    FormComponent,
    ListuserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InputTextModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    ToastModule,
    ReactiveFormsModule,
    TableModule,
    TooltipModule,
    BrowserAnimationsModule,
    ProgressSpinnerModule,
    CardModule,
    AccordionModule,
    ConfirmDialogModule,
    SidebarModule,
    NgxUiLoaderModule.forRoot(ngx),
    NgxUiLoaderHttpModule.forRoot({showForeground:true}),
    TabMenuModule
  ],

  providers: [MessageService,ConfirmationService],
  bootstrap: [AppComponent]
})

export class AppModule { }
