import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'testNt';

  message:any = null;
  constructor() {}
  ngOnInit(): void {
    
  }

}
