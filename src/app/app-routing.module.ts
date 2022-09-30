import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployyeComponent } from './add-employye/add-employye.component';
import { AuthGuard } from './auth.guard';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSetPassComponent } from './emp-set-pass/emp-set-pass.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LoginComponent } from './login/login.component';
import { Login3Component } from './login3/login3.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PageNotComponent } from './page-not/page-not.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SignupComponent } from './signup/signup.component';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'forget-password',
    component: ForgetPasswordPageComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: 'new-password',
    component: NewPasswordComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'verify',
    component: VerifyComponent
  },
  {
    path: 'user-list',
    component: Login3Component,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-emp',
    component: AddEmployyeComponent
  },
  {
    path: 'verify-emp',
    component: VerifyEmployeeComponent
  },
  {
    path:'emp-pass',
    component:EmpSetPassComponent
  },
  {
    path:'emp-login',
    component:EmpLoginComponent
  },
  {
    path: '**',
    component: PageNotComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }