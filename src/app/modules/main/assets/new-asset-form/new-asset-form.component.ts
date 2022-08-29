import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormTemplate } from 'src/app/templates/form.template';
import { ModalFormTemplate } from 'src/app/templates/modal-form.template';
import { AssetTypesService } from '../../assets-types/asset-types.service';

@Component({
  selector: 'app-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.scss']
})
export class NewAssetFormComponent extends ModalFormTemplate implements OnInit {

  @Input() editData;

  formTitle = "Add Asset";

  assetTypes = [];

  constructor(
    fb: FormBuilder,
    cd: ChangeDetectorRef,
    modalRef: NzModalRef,
    private assetTypeService: AssetTypesService
  ) { 
    super(fb, cd, modalRef);
  }

  ngOnInit(): void {
    this.loadAssetTypes();
    this.initForm();

    if(!this.editData) {
      this.addProp();
    }
  }

  loadAssetTypes(){
    this.assetTypeService.getAll().subscribe((data)=>{
      this.assetTypes = data;
    },
    ()=>{
      this.closeModal();
    })
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.editData?.id || 0, Validators.required],
      name: [this.editData?.name || '', Validators.required],
      assetTypeId: [this.editData?.assetType?.id || '', Validators.required],
      modelId: [this.editData?.model?.id || 1,Validators.required],
      properties: this.fb.array([])
    });

    this.cd.detectChanges();

    if(this.editData) {
      this.formTitle = "Edit Asset - " + this.editData?.id;
      this.setValues(this.editData);
    }
  }

  setValues(data) {
    this.form.get('id').patchValue(data?.id);
    this.form.get('name').patchValue(data?.name);
    this.form.get('assetTypeId').patchValue(data?.assetType?.id);
    this.form.get('modelId').patchValue(data?.model?.id);
    if(data.properties?.length > 0){
      data.properties.forEach(prop => {
        this.properties.push(this.newProp(prop?.key, prop?.value));
      });
    }

    this.cd.detectChanges();
  }

  get properties() {
    return this.form.get('properties') as FormArray;
  }

  newProp(key = '', value = '') {
    return this.fb.group({
      key: [key,Validators.required],
      value: [value,Validators.required]
    })
  }

  addProp(){
    this.properties.push(this.newProp());
  }

  deleteProp(lessonIndex: number) {
    this.properties.removeAt(lessonIndex);
  }

  castToObject(values: any) {
    return {...values, modelId:1};
  }

}
