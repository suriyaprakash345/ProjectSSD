import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

// interface user {
//   password:string;
//   token:string
// }

// interface result {
//   flag: boolean,
//   message: string
// }

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  reset: any = {
  }

  result:any={}

  constructor(private appService: AppService, private aRoute: ActivatedRoute,private rotuers:Router) { }

  ngOnInit(): void {
    this.aRoute.queryParams.subscribe(data => this.reset.token = data['token']);
  }

  resetPassword() {
    this.appService.resetPassword(this.reset).subscribe(data => {
      console.log(data)
      this.result = data
      if (this.result.flag){
        alert(this.result.message);
        this.rotuers.navigate(['login']);
      }
      else
        alert(this.result.message);
    })
  }
}
