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

  constructor(private appService: AppService, private aRoute: ActivatedRoute,
    private routers: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.aRoute.queryParams.subscribe((data: any) => {
      this.set.token = data.token;
    })
  }

  setEmpPassword() {

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

