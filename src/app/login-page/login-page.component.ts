import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})


export class LoginPageComponent implements OnInit {

  email!: string;
  password!: string;
  userDetails:any;
  data:any;

  constructor(private appService:AppService,private routers:Router) { }

  ngOnInit(): void {
    this.userDetails = new FormGroup ({
      email:new FormControl(null,[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])
    })
  }

  get form() {
    return this.userDetails.controls
  }
  
  login() {
   
    console.log(this.userDetails.value);

    this.appService.loign(this.userDetails.value).subscribe((data:any) => {

      this.data = data
      console.log(data['flag'], 'ssssssssss')
      if(this.data['flag']) {
        localStorage.setItem('token',this.data['token']);
        this.routers.navigate(['users-list'])
      }
    })
   }
}
