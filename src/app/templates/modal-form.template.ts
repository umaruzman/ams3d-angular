import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { FormTemplate } from './form.template';

@Directive({})
export abstract class ModalFormTemplate extends FormTemplate{
  
    constructor(fb: FormBuilder, cd:ChangeDetectorRef, private modalRef: NzModalRef) {
        super(fb,cd);
    }

    closeModal(data?:any){
        this.modalRef.close(data);
    }

    submitFormData() {
        this.closeModal({data: this.castToObject(this.data)});
    }

}