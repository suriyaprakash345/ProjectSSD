import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AppService } from '../app.service';

interface resObj {
  flag:boolean,
  message:string
}

@Component({
  selector: 'app-add-employye',
  templateUrl: './add-employye.component.html',
  styleUrls: ['./add-employye.component.scss']
})
export class AddEmployyeComponent implements OnInit {

  employee:any;

  constructor(private appService:AppService,private messageService:MessageService) { }

  ngOnInit(): void {
    this.employee = new FormGroup({
      name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern(/^[A-Za-z]+$/)]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      contact:new FormControl(null,[Validators.required,Validators.pattern(/^[0-9]+$/)]),
      location:new FormControl(null,[Validators.required])
    })

  }

  get form(){
    return this.employee.controls;
  }

  insertEmp(){
    this.appService.insertEmp(this.employee.value).subscribe((data:any) => {
      console.log(data);
      
      if(data.flag) {
        this.addSingle("success",data.message);
        return;
      }
      this.addSingle("error",data.message);
    })
  }
  
  addSingle(status: string, message: string) {
    this.messageService.add({ severity: status, summary: status, detail: message, styleClass: 'myLoginToats' });
  }

}
