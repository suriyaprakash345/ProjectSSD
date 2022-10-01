import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
  
  token='';

  constructor(private aRoute:ActivatedRoute,private appService:AppService,
    private routers:Router,private messageService:MessageService) { }

 ngOnInit(): void {
    this.aRoute.queryParams.subscribe(data=> {
      
      this.token = data['token'];
      
      this.appService.verifyToken(this.token).subscribe((res:any)=> {
      
        if(res.flag){
          this.addSingle("successs",res.message)
          this.routers.navigate(['login']);
          return;
        }
        this.addSingle("error",res.message);
      })
    });
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }

}
