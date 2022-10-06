import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {

  tfa: any = {
   // tempSecret:true
  };

  authcode: string = "";

  errorMessage: string = '';

  constructor(private appService:AppService) { }

  ngOnInit(): void {
  }

  confirm(){
    this.appService.verifyAuth(this.authcode).subscribe((res:any) => {
      console.log(res);
      
    })
  }

}
