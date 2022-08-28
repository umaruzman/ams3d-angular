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
    this.initForm({
      name: [Validators.required],
      assetTypeId: [Validators.required],
      modelId: [Validators.required]
    });

    this.form.addControl('properties', this.fb.array([]));
    this.addProp();
  }

  get assetProps() {
    return this.form.controls['properties'] as FormArray;
  }

  newProp() {
    return this.fb.group({
      key: [Validators.required],
      value: [Validators.required]
    })
  }

  addProp(){
    this.assetProps.push(this.newProp());
  }

  castToObject(values: any) {
    return {...values, modelId:1};
  }

}
