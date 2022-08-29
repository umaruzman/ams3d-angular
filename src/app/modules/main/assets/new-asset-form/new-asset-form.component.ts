import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormTemplate } from 'src/app/templates/form.template';
import { ModalFormTemplate } from 'src/app/templates/modal-form.template';

@Component({
  selector: 'app-new-asset-form',
  templateUrl: './new-asset-form.component.html',
  styleUrls: ['./new-asset-form.component.scss']
})
export class NewAssetFormComponent extends ModalFormTemplate implements OnInit {

  @Input() editData;

  constructor(
    fb: FormBuilder,
    cd: ChangeDetectorRef,
    modalRef: NzModalRef
  ) { 
    super(fb, cd, modalRef);
  }

  ngOnInit(): void {

    this.initForm();

    this.addProp();
  }

  initForm() {
    this.form = this.fb.group({
      id: [0, Validators.required],
      name: ['', Validators.required],
      assetTypeId: ['', Validators.required],
      modelId: ['',Validators.required],
      properties: this.fb.array([])
    });

    this.cd.detectChanges();

    if(this.editData) {
      this.setValues(this.editData);
    }
  }

  setValues(data) {
    this.form.get('id').patchValue(data?.id);
    this.form.get('name').patchValue(data?.name);
    this.form.get('assetTypeId').setValue(data?.assetType?.id);
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
