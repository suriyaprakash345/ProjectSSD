import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  
  token='';

  constructor(private aRoute:ActivatedRoute,private appService:AppService,private routers:Router) { }

 ngOnInit(): void {
    this.aRoute.queryParams.subscribe(data=> {
      this.token = data['token'];
      this.appService.verifyToken(this.token).subscribe(data12=> {
        console.log(data12)
        if(data12){
          alert("Account Verified Successfully");
          this.routers.navigate(['login']);
        }
        else {
          alert("Something went wrong");
        }
      })
    });
  }

}
