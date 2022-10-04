import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms'; ///,FormControl,FormGroup
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber } from 'rxjs';
import { AppService } from '../app.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  userName:string='';
  userMail:string='';
  message:string ='';
  isUpdate:boolean=false;
  usersList: Array<any> = [];
  userId: number = 0;
  data: any;
  userForm:any;
  userMsg:any;
  isdisable:boolean=true;

  constructor(private appService:AppService,private route:ActivatedRoute,private routes:Router,private form:FormBuilder) { }

  ngOnInit(): void {

    this.userForm = this.form.group({
      name : [null, [Validators.required, Validators.minLength(4)]],
      Email : [null, [Validators.required, Validators.email]],//formbuilder
      msg : [null,[]]
    })

    //  this.userForm = this.form.group({
    //   userName :new FormControl(null, [Validators.required, Validators.minLength(4)]),
    //   userMail :new FormControl(null, [Validators.required, Validators.email]),
    //   userMsg :new FormControl(null,null)//formcontol with formgroup
    // })


    this.route.params.subscribe((data)=>{
      console.log(data);
      data.hasOwnProperty('id')?this.isUpdate = true :this.isUpdate =false;
      
      if(this.isUpdate){
        this.userId = data['id']
        this.editId(this.userId)
      }
      
    })


  }


  get forms(){
    return this.userForm.controls
  }

  // get for(){
  //   return this.userForm.controls.userName
  // }
  

  addUser(){
    console.log("----------->",this.forms);
    this.appService.addUser(this.userForm.value).subscribe((data)=>{
      console.log(data);
      this.routes.navigate(['userlist'])
      
    })


  }

  editId(id:number){
    this.appService.editId(id).subscribe((data:any)=>{
      console.log(`------------------------data`,data);
      // this.data = data;
      // this.userName =this.data.result[0].name;
      // this.userMail =this.data.result[0].EMAIL;
      // this.message = this.data.result[0].msg;

      this.userForm.patchValue(data.result[0]);
      
      
    })
  }

  update(){
    this.appService.update({id:this.userId,name:this.userName,mail:this.userMail,message:this.message}).subscribe((data)=>{
      console.log(data);
      this.routes.navigate(['userlist'])
    })
    }

    formvalid(){
      if(this.userForm.invalid){
        this.isdisable=false;
        return this.userForm.markAllAsTouched();
        
      }
      
      this.addUser()

    }
  }


