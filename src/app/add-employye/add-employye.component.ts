import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppService } from '../app.service';
import { environment } from "../../environments/environment";
import { getMessaging, getToken, onMessage } from "firebase/messaging";



interface resObj {
  flag: boolean,
  message: string
}

@Component({
  selector: 'app-add-employye',
  templateUrl: './add-employye.component.html',
  styleUrls: ['./add-employye.component.scss'],
  
})
export class AddEmployyeComponent implements OnInit {

  employee: any;

  isDisabled = false;

  message:any;

  constructor(private appService: AppService, private messageService: MessageService,
    private confirmation:ConfirmationService,private routers:Router) { }

  ngOnInit(): void {
    
    this.employee = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z]+$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      contact: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(10), Validators.maxLength(10)]),
      location: new FormControl(null, [Validators.required])
    })

    this.requestPermission();
    this.listen()

  }

  get form() {
    return this.employee.controls;
  }

  confirm() {
    if(this.employee.invalid){

      return this.employee.markAllAsTouched();
    }
 
    this.confirmation.confirm({

        message: 'Are you sure that you want to perform this action?',
        accept: () => {
        
            this.appService.insertEmp(this.employee.value).subscribe((data: any) => {
              console.log(data);
        
              if (data.flag) {
                this.addSingle("success", data.message);
                this.isDisabled = false;
                return;
              }
              this.addSingle("error", data.message);
              this.isDisabled = false;
            })
          },
          reject:()=>{} 
        
        })}
       
      

   addSingle(status: string, message: string) {
     this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
   }

   logout(){
    localStorage.clear();
    this.routers.navigate(['login']);
   }


   requestPermission() {
    const messaging = getMessaging();
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }

  }
