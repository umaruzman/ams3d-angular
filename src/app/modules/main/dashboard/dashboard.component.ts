import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BasicComponent implements OnInit {

  constructor(toast: NzMessageService, modal: NzModalService) { 
    super(toast, modal);
  }

  ngOnInit(): void {
  }

  click(){

  }

}
