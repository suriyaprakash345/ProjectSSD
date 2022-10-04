import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
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
  isdisabled:boolean=false;

  constructor(private appService: AppService, private aRoute: ActivatedRoute,
    private routers: Router, private messageService: MessageService) { }

  ngOnInit(): void {
  //   this.empDetails = new FormGroup({
  //     password: new FormControl(null, [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,30})')])
  //   })
  // }

    this.aRoute.queryParams.subscribe((data: any) => {
      this.set.token = data.token;
    })
  }

  setEmpPassword() {
    // if(this.employee.invalid){
    //   this.isDisabled=true;
    //   return this.employee.markAllAsTouched();
    // }

    this.appService.setPassword(this.set).subscribe((data: any) => {

      if (data.flag) {
        this.addSingle("success", data.message);
        this.routers.navigate(['emp-login']);
        return;
      }

      this.addSingle("error", data.message);
    })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }

}

