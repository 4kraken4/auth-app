import { NgIf } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Typewriter from 't-writer.js';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  name = 'Angular';

  private twEle: ElementRef | any;
  private twriter1: any;
  private twriter2: any;
  loginForm!: FormGroup;
  formError = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      loginEmail: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
          asyncValidators: [],
          updateOn: 'submit',
        },
      ],
      loginPassword: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(32),
          ],
          asyncValidators: [],
          updateOn: 'submit',
        },
      ],
      loginRememberMe: [
        false,
        {
          validators: [],
          asyncValidators: [],
          updateOn: 'submit',
        },
      ],
    });
  }

  ngOnInit(): void {
    this.twEle = document.querySelector('#tw');
    const tconfig = {
      loop: false,
      addCursor: true,
      blinkSpeed: 400,
      typeSpeed: 'random',
      deleteSpeed: 'random',
      typeSpeedMin: 80,
      typeSpeedMax: 130,
      deleteSpeedMin: 90,
      deleteSpeedMax: 130,
      cursorClass: 'cursor-span',
      cursorColor: '#FFA800',
      typeColor: getComputedStyle(this.twEle).color,
    };

    this.twriter1 = new Typewriter(this.twEle, tconfig);
    this.twriter2 = new Typewriter(this.twEle, tconfig);

    // initialize the type effect
    this.initTypeEffect();
  }

  initTypeEffect() {
    this.twriter1
      .rest(1500)
      .type('Authentication ')
      .rest(350)
      .type('is ')
      .rest(250)
      .removeCursor()
      .type('now ')
      .rest(300)
      .then(this.twriter2.start.bind(this.twriter2))
      .start();

    this.twriter2
      .changeTypeColor('#FFA800')
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
      .then(this.twriter1.start.bind(this.twriter1));
  }

  onFocus() {
    setTimeout(() => {
      let randomInteger = Math.floor(Math.random() * 3);
      var ele = document
        .querySelector('.blob-wrapper')
        ?.getElementsByClassName('img-blob');
      if (ele) {
        ele[randomInteger].classList.add('blob-opacity-inc');
      }
    }, 100);
  }

  onBlur() {
    setTimeout(() => {
      var ele = document
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
    if (this.loginForm.valid) {
      this.hideErrorMessage();
      const data = {
        email: this.loginEmail?.value,
        password: this.loginPassword?.value,
        rememberMe: this.loginRememberMe?.value,
      };
      this.authService.login(data).subscribe({
        next: (response) => {
          console.log(response);
          if (response.success) {
            // window.location.href = routes.home;
          } else {
            this.decorateError(response.message);
          }
        },
        error: (error) => {
          throw error;
        },
      });
      return;
    }
    this.showErrorMessage();
  }

  private getErrorMessage() {
    let message = '';

    if (this.loginForm.get('loginEmail')?.errors) {
      if (this.loginForm.get('loginEmail')?.errors?.['required']) {
        message = 'Email is required';
      } else if (this.loginForm.get('loginEmail')?.errors?.['pattern']) {
        message = 'Please enter a valid email';
      }
    }

    if (this.loginForm.get('loginPassword')?.errors) {
      if (this.loginForm.get('loginPassword')?.errors?.['required']) {
        message = 'Password is required';
      } else if (this.loginForm.get('loginPassword')?.errors?.['minlength']) {
        message = 'Password must be at least 8 characters long';
      } else if (this.loginForm.get('loginPassword')?.errors?.['maxlength']) {
        message = 'Password cannot be more than 32 characters long';
      }
    }

    return message;
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
