import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
  
import { AppRoutingModule } from './app-routing.module';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> 48d0277d13fb2d4c1f206ee5d43ac63810abab1c
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import {InputTextModule} from 'primeng/inputtext';
import { LoginPageComponent } from './login-page/login-page.component';
import {HttpClientModule} from '@angular/common/http';
import { PageNotComponent } from './page-not/page-not.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyComponent } from './verify/verify.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetPasswordPageComponent,
    LoginPageComponent,
    PageNotComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SignupComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    InputTextModule,
    FormsModule,
<<<<<<< HEAD
    HttpClientModule,
    ReactiveFormsModule
    
    
=======
    ReactiveFormsModule,
    HttpClientModule
>>>>>>> 48d0277d13fb2d4c1f206ee5d43ac63810abab1c
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
