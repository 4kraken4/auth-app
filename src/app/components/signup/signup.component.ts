import { NgClass, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { finalize } from 'rxjs/operators';
import Typewriter from 't-writer.js';
import { BootstrapTooltipDirective } from '../../../bs-tooltip.directive';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

interface ErrorMessages {
  [key: string]: {
    [key: string]: string;
  };
}

declare var bootstrap: any;

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass, BootstrapTooltipDirective],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements AfterViewChecked, AfterViewInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showTw = event.target.innerWidth > 768;
  }
  @ViewChild('twElement') twEle!: ElementRef;
  @ViewChild('signUpEmailInput') signUpEmailInput!: ElementRef;
  @ViewChild('signUpPasswordInput') signUpPasswordInput!: ElementRef;
  @ViewChild('signUpCnfPasswordInput') signUpCnfPasswordInput!: ElementRef;

  private errorMessages: ErrorMessages = {
    signUpEmail: {
      required: 'Email is required',
      pattern: 'Please enter a valid email',
    },
    signUpPassword: {
      required: 'Password is required',
      minlength: 'Password must be at least 8 characters long',
      maxlength: 'Password cannot be more than 32 characters long',
    },
    signUpCnfPassword: {
      required: 'Password must be confirmed',
      mismatch: 'Passwords do not match',
    },
  };
  signUpForm: FormGroup;
  formError: any;
  showTw: boolean = true;
  formSubmitted: boolean = false;
  loading: boolean = false;
  private twInitialized = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService,
    private renderer: Renderer2
  ) {
    this.signUpForm = this.formBuilder.group(
      {
        signUpEmail: this.emailFormControl(),
        signUpPassword: this.passwordFormControl(),
        signUpCnfPassword: this.passwordConfirmFormControl(),
      },
      { validators: this.passwordMatchValidator, updateOn: 'submit' }
    );
  }

  ngAfterViewInit(): void {
    var tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngAfterViewChecked(): void {
    if (
      this.showTw &&
      !this.twInitialized &&
      this.twEle.nativeElement.offsetParent !== null
    ) {
      this.initTypeEffect();
      this.twInitialized = true;
    } else if (!this.showTw) {
      this.twInitialized = false;
    }
  }

  emailFormControl() {
    return [
      '',
      {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
        asyncValidators: [],
        updateOn: 'submit',
      },
    ];
  }

  passwordFormControl() {
    return [
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
    ];
  }

  passwordConfirmFormControl() {
    return [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [],
        updateOn: 'submit',
      },
    ];
  }

  get signUpEmail() {
    return this.signUpForm.get('signUpEmail');
  }

  get signUpPassword() {
    return this.signUpForm.get('signUpPassword');
  }

  get signUpCnfPassword() {
    return this.signUpForm.get('signUpCnfPassword');
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('signUpPassword');
    const confirmPassword = control.get('signUpCnfPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { mismatch: true };
    }
    return null;
  }

  getFormData() {
    return {
      email: this.signUpEmail?.value,
      password: this.signUpPassword?.value,
    };
  }

  sendSignUpRequest(data: { email: string; password: string }) {
    this.loading = true;
    this.authService
      .signUp(data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          if (response.success) {
            this.formSubmitted = false;
          } else {
            this.formError = response.message;
            this.notify.error(response.message, 'error');
          }
        },
        error: (error) => {
          this.notify.error(error.message, 'error');
          throw error;
        },
      });
  }

  signUp($event: any) {
    this.formSubmitted = true;

    if (this.signUpForm.invalid) {
      this.focusErrorElement();
      return;
    }

    this.formError = null;
    const data = this.getFormData();
    this.sendSignUpRequest(data);
  }

  // Design functions

  private focusErrorElement() {
    const inputElements: { [key: string]: ElementRef } = {
      signUpEmail: this.signUpEmailInput,
      signUpPassword: this.signUpPasswordInput,
      signUpCnfPassword: this.signUpCnfPasswordInput,
    };

    for (const key of Object.keys(this.signUpForm.controls)) {
      const control = this.signUpForm.controls[key];
      if (control.invalid) {
        const invalidControl = inputElements[key];
        if (invalidControl) {
          this.renderer.selectRootElement(invalidControl.nativeElement).focus();
          const errorMessage = this.getErrorMessage(key);
          if (errorMessage) {
          }
          break;
        }
      }
    }
  }

  private getErrorMessage(controlName: string) {
    const controlErrors = this.signUpForm.get(controlName)?.errors;
    if (controlErrors) {
      const errorKey = Object.keys(controlErrors)[0];
      const errorMessages = this.errorMessages[controlName];
      if (errorMessages && errorKey in errorMessages) {
        return errorMessages[errorKey];
      }
    }
    return '';
  }

  getFormControlClass(controlName: string): string {
    const control = this.signUpForm.get(controlName);

    return control && this.formSubmitted && control.invalid
      ? 'form-control-danger'
      : control && control.dirty && control.valid
      ? controlName === 'signUpCnfPassword' && this.signUpForm.invalid
        ? 'form-control-danger'
        : 'form-control-success'
      : '';
  }

  private initTypeEffect() {
    const tw1 = new Typewriter(
      this.twEle.nativeElement,
      JSON.parse(this.getTwConfig())
    );
    const tw2 = new Typewriter(
      this.twEle.nativeElement,
      JSON.parse(this.getTwConfig())
    );

    tw1
      .rest(1500)
      .type('Authentication ')
      .rest(350)
      .type('just ')
      .rest(250)
      .removeCursor()
      .type('got ')
      .rest(300)
      .then(tw2.start.bind(tw2))
      .start();

    tw2
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
      .then(tw1.start.bind(tw1));
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
      typeColor: getComputedStyle(this.twEle.nativeElement).color,
    });
  }
}
