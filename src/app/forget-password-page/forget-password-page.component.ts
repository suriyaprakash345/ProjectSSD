import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.scss']
})
export class ForgetPasswordPageComponent implements OnInit {

  mail: any;

  constructor(private appService: AppService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  forget() {

    this.appService.forget(this.mail).subscribe((data: any) => {
      console.log(data);

      if (data.flag) {
        this.addSingle("success", data.message);
        return;
      }
      this.addSingle("error", data.message);
    })
  }

  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }
}
