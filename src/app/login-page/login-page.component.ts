import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

interface user {
  email:string,
  password:string
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  email!: string;
  password!: string;
  userDetails!:user
  data:any;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }
  
  login() {
   
    this.userDetails = {
      "email": this.email,
      "password": this.password
    }

    this.appService.loign(this.userDetails).subscribe(data => {
      console.log(data);
      this.data = data
      if(this.data['flag']) {
        localStorage.setItem('token',this.data['token']);
      }
    })
  }
}
