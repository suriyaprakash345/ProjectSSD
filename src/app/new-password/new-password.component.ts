import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  reset: any = {
  }

  result:any={}

  constructor(private appService: AppService, private aRoute: ActivatedRoute,
    private rotuers:Router,private messageService:MessageService) { }

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(data => this.reset.token = data['token']);
  }

  resetPassword() {
   // this.reset.token = "null";
    this.appService.resetPassword(this.reset).subscribe(data => {
      console.log(data)
      
      this.result = data

      if (this.result.flag){
        this.addSingle("success",this.result.message)      
        this.rotuers.navigate(['login']);
        return;
      }
        this.addSingle("error",this.result.message);
    })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }
}
