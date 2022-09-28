import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormTemplate } from 'src/app/templates/form.template';
import { ModalFormTemplate } from 'src/app/templates/modal-form.template';

@Component({
  selector: 'app-new-metric-type-form',
  templateUrl: './new-metric-type-form.component.html',
  styleUrls: ['./new-metric-type-form.component.scss']
})
export class NewMetricTypeFormComponent extends ModalFormTemplate implements OnInit {

  @Input() editData;

  formTitle = "Add Metric Type";

  constructor(
    fb: FormBuilder,
    cd: ChangeDetectorRef,
    modalRef: NzModalRef
  ) { 
    super(fb, cd, modalRef);
  }

  ngOnInit(): void {

    this.initForm();

    // if(!this.editData) {
    //   this.addProp();
    // }
  }

  initForm() {
    this.form = this.fb.group({
      id: [this.editData?.id || 0, Validators.required],
      name: [this.editData?.name || '', Validators.required],
      unit: [this.editData?.unit || '', Validators.required],
    });

    this.cd.detectChanges();

    if(this.editData) {
      this.formTitle = "Edit Metric Type - " + this.editData?.id;
      this.setValues(this.editData);
    }
  }

  setValues(data) {
    this.form.get('id').patchValue(data?.id);
    this.form.get('type').patchValue(data?.type);

    this.cd.detectChanges();
  }

  // get properties() {
  //   return this.form.get('properties') as FormArray;
  // }

  // newProp(key = '', value = '') {
  //   return this.fb.group({
  //     key: [key,Validators.required],
  //     value: [value,Validators.required]
  //   })
  // }

  // addProp(){
  //   this.properties.push(this.newProp());
  // }

  // deleteProp(lessonIndex: number) {
  //   this.properties.removeAt(lessonIndex);
  // }

  castToObject(values: any) {
    return {...values, modelId:1};
  }

}
