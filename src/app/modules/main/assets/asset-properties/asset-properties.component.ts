import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-properties',
  templateUrl: './asset-properties.component.html',
  styleUrls: ['./asset-properties.component.scss']
})
export class AssetPropertiesComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit(): void {
    console.log('Data', this.data);
  }

}
