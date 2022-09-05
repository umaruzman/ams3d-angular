import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormTemplate } from 'src/app/templates/form.template';
import { ModalFormTemplate } from 'src/app/templates/modal-form.template';
import { AssetsService } from '../../main/services/assets.service';

@Component({
  selector: 'app-assign-asset-form',
  templateUrl: './assign-asset-form.component.html',
  styleUrls: ['./assign-asset-form.component.scss']
})
export class AssignAssetForm extends ModalFormTemplate implements OnInit {

  @Input() editData;
  @Input() dbid;

  formTitle = "Assign Asset";
  assets;

  constructor(
    fb: FormBuilder,
    cd: ChangeDetectorRef,
    modalRef: NzModalRef,
    private assetService: AssetsService
  ) { 
    super(fb, cd, modalRef);
  }

  ngOnInit(): void {

    this.loadAssets()
    this.initForm();
    // if(!this.editData) {
    //   this.addProp();
    // }
  }

  initForm() {
    this.form = this.fb.group({
      assetId: [this.editData?.id || 0, Validators.required],
      dbid: [this.editData?.id || 0, Validators.required],
    });

    if(this.dbid) {
      this.setValues({dbid:this.dbid})
    }

    this.cd.detectChanges();

    if(this.editData) {
      this.formTitle = "Edit Asset Type - " + this.editData?.id;
      this.setValues(this.editData);
    }
  }

  setValues(data) {
    if(data?.assetId){
      this.form.get('assetId').patchValue(data?.assetId);
    }
    if(data?.dbid) {
      this.form.get('dbid').patchValue(data?.dbid);
    }

    this.cd.detectChanges();
  }

  loadAssets() {
    this.assetService.getAll().subscribe(data=>{
      this.assets = data;
    })
  }

  castToObject(values: any) {
    return {...values, modelId:1};
  }

}
