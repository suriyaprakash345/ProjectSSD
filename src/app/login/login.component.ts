import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

interface user {
  name:string,
  email:string,
  mobile:number
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string='';
  mobile:number=0;
  name:string='';

  userDeatils!:user;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }

  register(){
    this.userDeatils = {
      "name":this.name,
      "email":this.email,
      "mobile":this.mobile
    }

   // this.appService.

  }

}
