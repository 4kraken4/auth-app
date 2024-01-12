import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthGuard } from './services/auth-gourd/auth-guard.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
      closeButton: false,
      progressBar: false,
      progressAnimation: 'decreasing',
      maxOpened: 3,
      autoDismiss: true,
      newestOnTop: true,
      enableHtml: true,
      easing: 'ease-in',
      easeTime: 300,
      extendedTimeOut: 3000,
      tapToDismiss: true,
    }),
    // { provide: ErrorHandler, useValue: ErrorHandlerService },
    AuthGuard,
  ],
};
