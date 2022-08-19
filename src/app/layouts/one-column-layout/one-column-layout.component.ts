import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-one-column-layout',
  templateUrl: './one-column-layout.component.html',
  styleUrls: ['./one-column-layout.component.scss']
})
export class OneColumnLayoutComponent implements OnInit {

  isCollapsed = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
