import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss']
})
export class EmpLoginComponent implements OnInit {

  empDetails: any;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.empDetails = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])
    })
  }

    get form() {
      return this.empDetails.controls
    }

    empLogin(){
      this.appService.empLogin(this.empDetails.value).subscribe((data:any) => {
        console.log(data);
      })
    }
}
