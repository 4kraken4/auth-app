import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import Typewriter from 't-writer.js';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements AfterViewInit {
  name = 'Angular';
  @ViewChild('tw') twEle: ElementRef | undefined;
  loginForm!: FormGroup;
  formError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      loginEmail: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$')
          ],
          asyncValidators: [],
          updateOn: 'submit'
        }
      ],
      loginPassword: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32)
          ],
          asyncValidators: [],
          updateOn: 'submit'
        }
      ],
      loginRememberMe: [
        false,
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'submit'
        }
      ]
    });
  }

  ngAfterViewInit(): void {
    // initialize the type effect
    this.initTypeEffect();
  }

  initTypeEffect() {
    const twriter1 = new Typewriter(
      this.twEle?.nativeElement,
      JSON.parse(this.getTwConfig())
    );
    const twriter2 = new Typewriter(
      this.twEle?.nativeElement,
      JSON.parse(this.getTwConfig())
    );

    twriter1
      ?.rest(1500)
      .type('Authentication ')
      .rest(350)
      .type('is ')
      .rest(250)
      .removeCursor()
      .type('now ')
      .rest(300)
      .then(twriter2?.start.bind(twriter2))
      .start();

    twriter2
      ?.changeTypeColor('#FFA800')
      .type(' easier.')
      .rest(500)
      .remove(' easier.'.length)
      .rest(500)
      .type(' secure.')
      .rest(500)
      .remove(' secure.'.length)
      .rest(500)
      .type(' faster.')
      .rest(1500)
      .clear()
      .removeCursor()
      .then(twriter1?.start.bind(twriter1));
  }

  private getTwConfig(): string {
    return JSON.stringify({
      loop: false,
      addCursor: true,
      blinkSpeed: 400,
      typeSpeed: 'random',
      deleteSpeed: 'random',
      typeSpeedMin: 110,
      typeSpeedMax: 150,
      deleteSpeedMin: 110,
      deleteSpeedMax: 150,
      cursorClass: 'cursor-span',
      cursorColor: '#FFA800',
      typeColor: getComputedStyle(this.twEle?.nativeElement).color
    });
  }

  onFocus() {
    setTimeout(() => {
      const randomInteger = Math.floor(Math.random() * 3);
      const ele = document
        .querySelector('.blob-wrapper')
        ?.getElementsByClassName('img-blob');
      if (ele) {
        ele[randomInteger].classList.add('blob-opacity-inc');
      }
    }, 100);
  }

  onBlur() {
    setTimeout(() => {
      const ele = document
        .querySelector('.blob-wrapper')
        ?.getElementsByClassName('img-blob');
      if (ele) {
        for (let index = 0; index < ele.length; index++) {
          const element = ele[index];
          element.classList.remove('blob-opacity-inc');
        }
      }
    }, 100);
  }

  // logical part

  get loginEmail() {
    return this.loginForm.get('loginEmail');
  }

  get loginPassword() {
    return this.loginForm.get('loginPassword');
  }

  get loginRememberMe() {
    return this.loginForm.get('loginRememberMe');
  }

  login(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.hideErrorMessage();
      const data = {
        email: this.loginEmail?.value,
        password: this.loginPassword?.value,
        rememberMe: this.loginRememberMe?.value
      };
      this.authService.login(data).subscribe({
        next: response => {
          if (response.success) {
            this.router.navigate(['/protected']);
          } else {
            console.error(response.message);
          }
        },
        error: error => {
          throw error;
        }
      });
      return;
    }
    this.showErrorMessage();
  }

  private getErrorMessage() {
    return (
      this.getFormControlErrorMessage('loginEmail', {
        required: 'Email is required',
        pattern: 'Please enter a valid email'
      }) ||
      this.getFormControlErrorMessage('loginPassword', {
        required: 'Password is required',
        minlength: 'Password must be at least 8 characters long',
        maxlength: 'Password cannot be more than 32 characters long'
      }) ||
      ''
    );
  }

  private getFormControlErrorMessage(
    controlName: string,
    errorMessages: { [key: string]: string }
  ) {
    const control = this.loginForm.get(controlName);
    if (control?.errors) {
      for (const errorKey in control.errors) {
        if (control.errors && errorMessages[errorKey]) {
          return errorMessages[errorKey];
        }
      }
    }
    return null;
  }

  private addShake(element: Element) {
    element?.classList.add('shake-animation');
    element?.addEventListener('animationend', () => {
      element.classList.remove('shake-animation');
    });
  }

  private decorateError(error: string) {
    this.formError = error;
    const formEle = document.querySelector('.form-signin');
    formEle?.classList.add('form-error');
    setTimeout(() => {
      formEle?.classList.remove('form-error');
    }, 3000);
    this.loginForm.get('loginEmail')?.markAsTouched();
    this.loginForm.get('loginPassword')?.markAsTouched();
  }

  private showErrorMessage() {
    this.decorateError(this.getErrorMessage());
    this.addShake(document.querySelector('.form-signin')!);
    this.addPopup(document.querySelector('#error')!);
  }

  private hideErrorMessage() {
    const errorMessageElement = document.querySelector('#error');
    this.addPopdown(errorMessageElement!);
    setTimeout(() => {
      this.formError = '';
    }, 500);
  }

  private addPopup(element: Element) {
    element?.classList.add('popup-animation');
    element?.addEventListener('animationend', () => {
      element.classList.remove('popup-animation');
    });
  }

  private addPopdown(element: Element) {
    element?.classList.add('popout-animation');
    element?.addEventListener('animationend', () => {
      element.classList.remove('popout-animation');
    });
  }
}
