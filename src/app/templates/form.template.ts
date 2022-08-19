import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Directive({})
export abstract class FormTemplate{
    @Input() form:FormGroup;
    @Input() formData:any;
    
    @Input() title: string;
    @Input() edit:boolean = false;

    @Output() onSubmit = new EventEmitter<any>();
    @Output() onClose = new EventEmitter<any>();

    linear:boolean = true;


    pending = false;

    constructor(
        protected fb:FormBuilder,
        protected cd: ChangeDetectorRef
        ){
    }

    initForm(def:any,formData?:any,extra?:any){
        this.form = this.fb.group({},extra);
        let keys = Object.keys(def);

        keys.forEach(key => {
            this.form.addControl(key,new FormControl(
                formData && formData[key] ? formData[key] : '',def[key]));
        });

        this.cd.detectChanges();
    }

    setFormData(data){
        let keys = Object.keys(data);

        keys.forEach(key => {
            if (this.form.controls[key])
                this.form.controls[key].setValue(data[key]);
        });
    }

    getValueListener(key){
        if (this.form.controls[key])
            return this.form.controls[key].valueChanges;
        else
            throw new Error(`No FormControl exists with key:${key}`);
    }

    get valid(){
        return this.form?.valid;
    }

    get data(){
        return this.form?.value;
    }

    get controls() {
        return this.form.controls;
    }

    get showError(): boolean {
        let ret = false;
        for(let i=0 ; i < Object.keys(this.form.controls).length ; i++) {
          const con = Object.values(this.form.controls)[i];
          if (!con.valid && con.dirty)
            return true;
        }
        return ret;
    }

    close() {
        this.onClose.emit();
    }

    submitForm():void {
        if (this.form.valid){
            this.onSubmit.emit(this.castToObject(this.data));
            this.afterSubmit();
        }
    }

    afterSubmit(): void {};

    validateNum(event) {
        const events = ['Backspace','Delete','Home','End','Insert','ArrowUp','ArrowRight','ArrowDown','ArrowLeft','.'];
        const num = Number(event.key);
        
        if(isNaN(num) && !events.find(x=> x == event.key))
          event.preventDefault();
    }

    evaluateInputWarning(controlName: string): any {
        return {
            'border border-danger': (
            this.controls[controlName]?.invalid &&
            (this.controls[controlName]?.dirty || this.controls[controlName].touched)
            )
        }
    }

    charLimitClass(value, limit){
        return value > limit ? 'text-danger' : '';
    }

    abstract castToObject(values:any);
}