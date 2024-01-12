import { NgClass, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Typewriter from 't-writer.js';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements AfterViewChecked {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.showTw = event.target.innerWidth > 768;
  }
  @ViewChild('twElement') twEle!: ElementRef;

  signUpForm: FormGroup;
  formError: any;
  showTw: boolean = true;
  formSubmitted: boolean = false;
  loading: boolean = false;
  private twInitialized = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private notify: NotificationService
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
    this.authService.signUp(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.formSubmitted = false;
        } else {
          this.formError = response.message;
          this.loading = false;
          this.notify.success(response.message, 'Error');
        }
      },
      error: (error) => {
        this.loading = false;
        this.notify.error(error.message, 'Error');
        throw error;
      },
    });
  }

  signUp($event: any) {
    this.formSubmitted = true;

    if (!this.signUpForm.valid) {
      return;
    }

    this.formError = null;
    const data = this.getFormData();

    this.sendSignUpRequest(data);
  }

  // Design functions

  private getErrorMessage() {
    return (
      this.getFormControlErrorMessage('signUpEmail', {
        required: 'Email is required',
        pattern: 'Please enter a valid email',
      }) ||
      this.getFormControlErrorMessage('signUpPassword', {
        required: 'Password is required',
        minlength: 'Password must be at least 8 characters long',
        maxlength: 'Password cannot be more than 32 characters long',
      }) ||
      this.getFormControlErrorMessage('signUpCnfPassword', {
        required: 'Password must be confirmed',
        mismatch: 'Passwords do not match',
      }) ||
      ''
    );
  }

  private getFormControlErrorMessage(
    controlName: string,
    errorMessages: { [key: string]: string }
  ): string | null {
    const control = this.signUpForm.get(controlName);
    const controlErrorKey =
      control?.errors &&
      Object.keys(control.errors).find((key) => errorMessages[key]);
    const formErrorKey =
      this.signUpForm.errors &&
      Object.keys(this.signUpForm.errors).find((key) => errorMessages[key]);
    return errorMessages[controlErrorKey || formErrorKey || ''] || null;
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
      typeSpeedMin: 80,
      typeSpeedMax: 130,
      deleteSpeedMin: 90,
      deleteSpeedMax: 130,
      cursorClass: 'cursor-span',
      cursorColor: '#FFA800',
      typeColor: getComputedStyle(this.twEle.nativeElement).color,
    });
  }
}
