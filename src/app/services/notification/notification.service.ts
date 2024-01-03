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
    this.toast.success(message, title);
  }
}
