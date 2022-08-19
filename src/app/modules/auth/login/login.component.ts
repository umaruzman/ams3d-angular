import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormTemplate } from 'src/app/templates/form.template';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormTemplate implements OnInit {

  constructor(fb: FormBuilder, cd: ChangeDetectorRef) { 
    super(fb,cd);
  }

  ngOnInit(): void {
    this.initForm(
      {
      username: Validators.required,
      password: Validators.required,
      rememberMe: Validators.nullValidator
      },
      {
        ...{rememberMe:true}
      }
    )
  }

  submitForm() {
    console.log(this.form.value);
  }

  castToObject(values: any) {
    return values;
  }

}
