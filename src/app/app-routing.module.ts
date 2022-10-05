import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEmployyeComponent } from './add-employye/add-employye.component';
import { AuthEmpLoginGuard, AuthGuard, AuthUserGuard, AuthUserLoginGuard } from './auth.guard';
import { EmpBucketListComponent } from './emp-bucket-list/emp-bucket-list.component';
import { EmpHomeComponent } from './emp-home/emp-home.component';
import { EmpLoginComponent } from './emp-login/emp-login.component';
import { EmpSetPassComponent } from './emp-set-pass/emp-set-pass.component';
import { ForgetPasswordPageComponent } from './forget-password-page/forget-password-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { Login3Component } from './login3/login3.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PageNotComponent } from './page-not/page-not.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserGuard } from './user.guard';
import { VerifyEmployeeComponent } from './verify-employee/verify-employee.component';
import { VerifyComponent } from './verify/verify.component';
import { FormComponent } from './form/form.component';
import { ListuserComponent } from './listuser/listuser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [AuthUserLoginGuard]
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
  {//this.addSingle("success", data.message);
    path: 'user-list',
    component: Login3Component,
    canActivate: [UserGuard]
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
    path: 'emp-pass',
    component: EmpSetPassComponent
  },
  {
    path: 'emp-login',
    component: EmpLoginComponent,
    canActivate: [AuthEmpLoginGuard]
  },
  {
    path: 'user',
    component: ListuserComponent
  },
{
    path: 'form',
    component: FormComponent
  },
  {
    path: 'home',
    component: EmpHomeComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'list',
    component: EmpBucketListComponent,
    canActivate: [AuthUserGuard],
  },
  {
    path: 'users-home',
    component: UserHomeComponent,
    canActivate: [AuthUserGuard]
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