import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

interface searchResult {
  id: number,
  name: string,
  email: string,
  contactNo: string,

}

@Component({
  selector: 'app-emp-bucket-list',
  templateUrl: './emp-bucket-list.component.html',
  styleUrls: ['./emp-bucket-list.component.scss']
})
export class EmpBucketListComponent implements OnInit {

  cols: Array<string> = [];
  empsList: any[] = [];
  isSortType = false;
  sortType: string = "asc";
  searchKey: string = '';
  totalCounts: number = 0;



  constructor(private appService: AppService) { }

  ngOnInit(): void {

    this.getCount();

    this.getListByPage({page:0});

  }

  getCount() {
    this.appService.getCount().subscribe((res: any) => {
      console.log(res);

      this.totalCounts = res.count;

    })
  }


  sort(col: string) {

    this.isSortType = !this.isSortType;

    if (this.isSortType)
      this.sortType = "desc"
    else
      this.sortType = 'asc'

    console.log(this.sortType);

    this.appService.sortTable(col, this.sortType).subscribe((res: any) => {
      console.log(res);
      this.empsList = res;
    })
  }

  search(value: any) {
    console.log(value);
    this.appService.searchList(value.target.value).subscribe((res: any) => {
      console.log(res);
      this.empsList = res;
    })
  }

  getListByPage(event:any) {
 
    console.log(event);
    
    this.appService.getListByPage(event.page).subscribe((res: any) => {
      console.log(res);
      this.cols = Object.keys(res[0])
      this.empsList = res;
    })
  }



}

