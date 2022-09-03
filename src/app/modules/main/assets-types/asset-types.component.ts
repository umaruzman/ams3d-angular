import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BasicComponent } from 'src/app/templates/basic-component.template';
import { AssetTypesService } from '../services/asset-types.service';
import { NewAssetTypeFormComponent } from './new-asset-type-form/new-asset-type-form.component';

@Component({
  selector: 'app-asset-types',
  templateUrl: './asset-types.component.html',
  styleUrls: ['./asset-types.component.scss']
})
export class AssetTypesComponent extends BasicComponent implements OnInit {

  constructor(
    toast: NzMessageService,
    modal: NzModalService,
    private service: AssetTypesService
  ) {
    super(toast,modal);
  }

  ngOnInit(): void {
    this.getAllAssets();
  }

  getAllAssets(){
    this.service.getAll()
      .subscribe(data=>{
        this.data = data;
        console.log('Init Data', data);
      },
      (e)=>{
        this.showError('Failed to Load Data', e);
      })
  }


  newAssetForm(){
    const ref = this.showDialog(NewAssetTypeFormComponent);
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        this.saveAsset(data.data);
      }
    });
  }

  editAssetForm(asset){
    const ref = this.showDialog(NewAssetTypeFormComponent, {editData: asset});
    ref.afterClose.subscribe(data=>{
      if(data?.data){
        this.updateAsset(data.data);
      }
    });
  }

  saveAsset(data){
    this.service.add(data).subscribe((res)=>{
      this.showSuccess('Asset Added Successfully!');
      this.getAllAssets();
    },
    () => {
      this.showError('Failed to add Asset, please check and try again!');
    });
  }

  updateAsset(data){
    this.service.update(data.id,data).subscribe((res)=>{
      this.showSuccess('Asset Changes Saved Successfully!');
      this.getAllAssets();
    },
    () => {
      this.showError('Failed to save changes to Asset, please check and try again!');
    });
  }



  deleteAsset(id){
    this.service.delete(id).subscribe((res)=>{
      this.showSuccess('Successfully Deleted Asset!');
      this.getAllAssets();
    },
    () => {
      this.showError('Failed to delete Asset, please check and try again!');
    });
  }

}
