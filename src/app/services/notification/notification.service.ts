import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toast: ToastrService,
  ) { }

  showSuccess(message: string, title: string) {
    this.toast.success(message, title, { progressBar: true });
  }

  showError(message: string, title: string) {
    this.toast.error(message, title);
  }

  showWarning(message: string, title: string) {
    this.toast.warning(message, title);
  }

  showInfo(message: string, title: string) {
    this.toast.info(message, title);
  }

  showCustom(message: string, title: string) {
    this.toast.show(message, title, { progressBar: true });
  }
}
