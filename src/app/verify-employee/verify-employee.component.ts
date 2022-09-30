import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-verify-employee',
  templateUrl: './verify-employee.component.html',
  styleUrls: ['./verify-employee.component.scss']
})
export class VerifyEmployeeComponent implements OnInit {

  constructor(private aRoute: ActivatedRoute, private appService: AppService,private routers:Router) { }

  ngOnInit(): void {

    // this.aRoute.queryParams.subscribe((data: any) => {
    //   console.log(data);
      
    //   this.appService.verifyEmp(data.token).subscribe((verifyResult: any) => {
    //     console.log(verifyResult);
    //     if(verifyResult.flag){
    //       this.routers.navigate(['emp-pass']);
    //     }
    //   })
    // })
  }

}
