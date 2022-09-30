import { Component,OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { AppService } from '../app.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
 createPwd:string ="";
 userForm:any;
 confirmPwd:string='';
 data:any;


  constructor(private appService:AppService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      createPwd: [null,[Validators.required,Validators.minLength(8)]],
      confirmPwd : [null,[Validators.required]]
    })

  }

  get form(){
    return this.userForm.controls;
  }
  
 




}
