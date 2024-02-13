import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService extends ErrorHandler {
  constructor(private injector: Injector, private zone: NgZone) {
    super();
  }

  override handleError(error: Error | HttpErrorResponse): void {
    const notifier = this.injector.get(NotificationService);

    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        notifier.error(error.message, 'An HTTP error occurred');
      } else {
        notifier.error(error.message, 'An error occurred');
      }
    });

    super.handleError(error);
  }
}
