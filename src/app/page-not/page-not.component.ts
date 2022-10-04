import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-page-not',
  templateUrl: './page-not.component.html',
  styleUrls: ['./page-not.component.scss']
})
export class PageNotComponent implements OnInit {

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

  }

  addSingle() {
    this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
  }

}
