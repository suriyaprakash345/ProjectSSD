import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
// import { Product } from '../../domain/product';
// import { ProductService } from '../../service/productservice';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListuserComponent implements OnInit {

  constructor(private route:ActivatedRoute,private appService:AppService,private router:Router) { }
  usersList:any;
  data:any;
  products=[];
  cols: any[] = [];
  value:string='';
  issearch:boolean=true;
  data1:any;

  ngOnInit(): void {



    this.userDetails();
    }
   userDetails(){
    this.appService.getUser().subscribe((data)=>{
      this.data = data
      console.log("---------->",this.data.result[0]);
      this.usersList = this.data.result
      
    })
  }
  editUser(id : number){
      this.router.navigate(['edituser',id],{relativeTo : this.route});
  }


  deleteUser(id:number){
    this.appService.delete(id).subscribe((data)=>{
      this.userDetails();
    })
    
  }

filterGlobal(data1:any){
console.log('okkk',data1.target.value);
var find = data1.target.value
if(find != null){
  this.appService.getUser().subscribe((result)=>{
    this.data = result
    console.log("---------->",this.data.result);
  
    // if( find[i] == this.data.result[i]){
    //   console.log(this.data.result)
    // }
  })
  
  }
}
//   isOutofbox(data:any) {
//     return data.inventoryStatus === 'OUTOFSTOCK';
// }

  }
