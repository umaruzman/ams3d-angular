import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormTemplate } from 'src/app/templates/form.template';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormTemplate implements OnInit {

  error: string;
  submitted: boolean;

  constructor(fb: FormBuilder, cd: ChangeDetectorRef, private auth: AuthService, private router: Router) { 
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

  login() {
    const data = this.form.value;
    this.submitted = true;
    this.error = null;
    
    this.auth.login(data['username'], data['password']).subscribe(
      res => this.router.navigate(['/assets']),
      err => {
        this.submitted = false;
        this.error = err?.message || 'Invalid username or password';
        this.form.get('password').setValue('');
      }
    );
  }

  submitForm() {
    this.login();
  }

  castToObject(values: any) {
    return values;
  }

}
