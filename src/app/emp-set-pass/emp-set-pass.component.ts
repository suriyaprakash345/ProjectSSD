import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-emp-set-pass',
  templateUrl: './emp-set-pass.component.html',
  styleUrls: ['./emp-set-pass.component.scss']
})
export class EmpSetPassComponent implements OnInit {

  set = {
    "password": "",
    "token": ""
  }

  constructor(private appService: AppService, private aRoute: ActivatedRoute,private routers:Router) { }

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe((data: any) => {
      console.log(data);
      this.set.token = data.token;
    })
  }


setEmpPassword(){
  this.appService.setPassword(this.set).subscribe((data:any) => {
    console.log(data);
    if(data.flag)
      this.routers.navigate(['emp-login']);
    
  })
}

}

