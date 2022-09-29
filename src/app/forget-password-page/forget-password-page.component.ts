import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {

  mail:any;

  constructor(private appService:AppService) { }

  ngOnInit(): void {  
  }

 forget () {
  console.log(this.mail);
  
  this.appService.forget(this.mail).subscribe(data => {
    console.log(data);
  })
 }
 
}
