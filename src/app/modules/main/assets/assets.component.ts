import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { AssetPropertiesComponent } from './asset-properties/asset-properties.component';
import { AssetsService } from './assets.service';
import { map } from 'rxjs/operators';
import { NewAssetFormComponent } from './new-asset-form/new-asset-form.component';

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent extends BasicComponent implements OnInit {

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private service: AssetsService
  ) {
    super(toast,modal);
  }

  ngOnInit(): void {
    this.getAllAssets();
  }

  getAllAssets(){
    this.service.getAll()
      .subscribe(data=>{
        data.map(a=> a.properties = JSON.parse(a.properties));
        this.data = data;
        console.log('Init Data', data);
      },
      (e)=>{
        this.showError('Failed to Load Data', e);
      })
  }

  viewProperties(props){
    this.showDialog(AssetPropertiesComponent, {data: props});
  }

  newAsset(){
    const ref = this.showDialog(NewAssetFormComponent);
    ref.afterClose.subscribe(data=>{
      console.log('Form Data', data);
    });
  }

}
