import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

interface searchResult {
  id:number,
  name:string,
  email:string,
  contactNo:string,
  
}

@Component({
  selector: 'app-emp-bucket-list',
  templateUrl: './emp-bucket-list.component.html',
  styleUrls: ['./emp-bucket-list.component.scss']
})
export class EmpBucketListComponent implements OnInit {

  cols: Array<string> = [];
  empsList:any[] = [];
  isSortType=false;
  sortType:string = "asc";
  searchKey:string = '';
 


  constructor(private appService:AppService) { }

  ngOnInit(): void {
    this.getAllEmp();
  }

  
  getAllEmp() {
    this.appService.getAllEmp().subscribe((res:any) => {
      console.log(res);
     this.empsList = res;
     this.cols =Object.keys(res[0]);
     console.log(this.cols);
    })
  }

  sort(col:string){
    console.log(`${col} sorting......`);

    this.isSortType = !this.isSortType;

    if(this.isSortType)
      this.sortType = "desc"
    else
      this.sortType = 'asc'

    console.log(this.sortType);
    

    this.appService.sortTable(col,this.sortType).subscribe((res:any) => {
      console.log(res);
      this.empsList = res;
    })
  }

  search(value:any){
    console.log(value);
    
    this.appService.searchList(value.target.value).subscribe((res:any) => {
      console.log(res);
      this.empsList=res;
    })
  }

}

