import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  private errorSubject = new Subject<Error>();
  error$ = this.errorSubject.asObservable();

  constructor(private injector: Injector, private zone: NgZone) {
    super();
  }

  override handleError(error: Error | HttpErrorResponse): void {
    const notifier = this.injector.get(NotificationService);

    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        // Handle HTTP error
        console.error('An HTTP error occurred:', error.message);
        notifier.showCustom(error.message, 'An HTTP error occurred');
      } else {
        // Handle client error
        console.error('An error occurred:', error.message);
        notifier.showCustom(error.message, 'An error occurred');
      }
    });

    this.errorSubject.next(error);
    super.handleError(error);
  }
}
