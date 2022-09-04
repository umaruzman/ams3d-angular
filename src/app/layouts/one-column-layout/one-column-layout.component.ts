import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-one-column-layout',
  templateUrl: './one-column-layout.component.html',
  styleUrls: ['./one-column-layout.component.scss']
})
export class OneColumnLayoutComponent implements OnInit {

  isCollapsed = false;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openModelViewer(){
    this.router.navigate(['viewer'])
  }


}
