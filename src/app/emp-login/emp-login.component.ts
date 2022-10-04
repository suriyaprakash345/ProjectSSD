import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss']
})
export class EmpLoginComponent implements OnInit {

  empDetails: any;
  message: string = '';
  passwordToolTip = "At least 8 characters in length Should contain:" +
    "Lower case letters (a-z)" +
    "Upper case letters (A-Z)" +
    "Numbers (i.e. 0-9)";

  constructor(private appService: AppService, private messageService: MessageService,
    private aRoute:ActivatedRoute,private routes:Router) { }

  ngOnInit(): void {

    this.empDetails = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,30})')])
    })
  }

  get form() {
    return this.empDetails.controls
  }

  empLogin() {

    // if(this.empDetails.invalid){
    //   return this.empDetails.markAllAsTouched();
    // }

    this.appService.empLogin(this.empDetails.value).subscribe((data: any) => {

      if (data.flag) {
        this.addSingle("success", data.message);

        localStorage.setItem("token", data.token);
        localStorage.setItem("roleId", data.roleId);

        this.routes.navigate(['/home'])
        return;
      }
      this.addSingle("error", data.message)
    })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }
}
