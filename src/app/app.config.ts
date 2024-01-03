import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideToastr({
      timeOut: 30000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: true,
      progressBar: false,
      progressAnimation: 'decreasing',
      maxOpened: 3,
      autoDismiss: true,
      newestOnTop: true,
      enableHtml: true,
      easing: 'ease-in',
      easeTime: 300,
      extendedTimeOut: 1000,
      tapToDismiss: true
    })
  ]
};
