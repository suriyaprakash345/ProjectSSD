import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent implements OnInit {

  userDetails: any;
  data: any;

  constructor(private appService: AppService, private routers: Router,
    private messageService: MessageService) { }

  ngOnInit(): void {

    this.userDetails = new FormGroup({

      email: new FormControl(null, [Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),

      password: new FormControl(null, [Validators.required,
      Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])
    })
  }

  get form() {
    return this.userDetails.controls
  }

  login() {

    if (this.userDetails.invalid) {
     this.addSingle("error","please fill the all fields")
     return this.userDetails.markAllAsTouched();
    }

    this.appService.loign(this.userDetails.value).subscribe((data: any) => {

      this.data = data

      if (this.data['flag']) {
        localStorage.setItem('token', this.data['token']);
        localStorage.setItem('roleId',this.data.roleId);

        this.addSingle("success", this.data.message);
        this.routers.navigate(['users-home']);
        return;
      }
      this.addSingle("error", this.data.message);
    })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }
}
