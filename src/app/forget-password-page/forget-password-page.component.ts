import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {

  email:string='';

  constructor(private appService:AppService) { }

  ngOnInit(): void {  
  }

 forget () {
  this.appService.forget(this.email).subscribe(data => {
    console.log(data);
  })
 }
}
