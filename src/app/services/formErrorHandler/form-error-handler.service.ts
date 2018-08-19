import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';
import {MessageService} from '../message/message.service';

class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return (control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable()
export class FormErrorHandlerService {
  public customErrorMatcher = new MyErrorStateMatcher();

  constructor(public fb: FormBuilder,
              public messageService: MessageService) {
  }

  public createRegisterForm() {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      theme: ['', [Validators.required]],
      language: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public createLoginForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  public getNameErrorMessage(form: FormGroup) {
    return form.get('name').hasError('required') ? this.messageService.textsErrors.required :
      form.get('name').hasError('minlength') ? this.messageService.textsErrors.name : '';
  }

  public getEmailErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required') ? this.messageService.textsErrors.required :
      form.get('email').hasError('email') ? this.messageService.textsErrors.email : '';
  }

  public getPasswordErrorMessage(form: FormGroup) {
    return form.get('password').hasError('required') ? this.messageService.textsErrors.required :
      form.get('password').hasError('minlength') ? this.messageService.textsErrors.password : '';
  }

  public getSelectThemeErrorMessage(form: FormGroup) {
    return form.get('theme').hasError('required') ? this.messageService.textsErrors.theme : '';
  }

  public getSelectLanguageErrorMessage(form: FormGroup) {
    return form.get('language').hasError('required') ? this.messageService.textsErrors.language : '';
  }

  public createInitialSetupForm() {
    return this.fb.group({
      theme: ['', [Validators.required]],
      language: ['', [Validators.required]]
    });
  }
}
