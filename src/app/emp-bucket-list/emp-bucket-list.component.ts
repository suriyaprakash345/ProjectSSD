import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-emp-bucket-list',
  templateUrl: './emp-bucket-list.component.html',
  styleUrls: ['./emp-bucket-list.component.scss']
})
export class EmpBucketListComponent implements OnInit {

  cols: Array<string> = [];
  empsList:any[] = [];

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
    this.appService.sortTable(col).subscribe((res:any) => {
      console.log(res);
    })
  }

}

