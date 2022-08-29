import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { FormTemplate } from 'src/app/templates/form.template';
import { ModalFormTemplate } from 'src/app/templates/modal-form.template';

@Component({
  selector: 'app-models-form',
  templateUrl: './models-form.component.html',
  styleUrls: ['./models-form.component.scss']
})
export class ModelsFormComponent extends ModalFormTemplate implements OnInit {

  @Input() editData;

  formTitle = "Add Asset Type";

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
      modelIdentifier: [this.editData?.modelIdentifier || '', Validators.required],
      modelName: [this.editData?.modelName || '', Validators.required],
    });

    this.cd.detectChanges();

    if(this.editData) {
      this.formTitle = "Edit Asset Type - " + this.editData?.id;
      this.setValues(this.editData);
    }
  }

  setValues(data) {
    this.form.get('id').patchValue(data?.id);
    this.form.get('modelIdentifier').patchValue(data?.modelIdentifier);
    this.form.get('modelName').patchValue(data?.modelName);

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
