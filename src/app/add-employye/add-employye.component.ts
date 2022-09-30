import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-add-employye',
  templateUrl: './add-employye.component.html',
  styleUrls: ['./add-employye.component.scss']
})
export class AddEmployyeComponent implements OnInit {

  employee:any;

  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.employee = new FormGroup({
      name:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required,Validators.email]),
      contact:new FormControl(null,[Validators.required]),
      location:new FormControl(null,[Validators.required])
    })

  }

  get form(){
    return this.employee.controls;
  }

  insertEmp(){
    this.appService.insertEmp(this.employee.value).subscribe((data:any) => {
      console.log(data);
    })
  }  

}
