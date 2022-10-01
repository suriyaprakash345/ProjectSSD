import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-emp-login',
  templateUrl: './emp-login.component.html',
  styleUrls: ['./emp-login.component.scss']
})
export class EmpLoginComponent implements OnInit {

  empDetails: any;
  message: string = '';

  constructor(private appService: AppService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.empDetails = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      password: new FormControl(null, [Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,30})')])
    })
  }

  get form() {
    return this.empDetails.controls
  }

  empLogin() {
      this.addSingle("error", 'test');
    //   this.appService.empLogin(this.empDetails.value).subscribe((data: any) => {
    //   if (data.flag) {
    //     this.addSingle("success", data.message);
    //     return;
    //   }
    // })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: 'Service Message', detail: message, styleClass: 'myLoginToast',life: 300000 });
  }
}
