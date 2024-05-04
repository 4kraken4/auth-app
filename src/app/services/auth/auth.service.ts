import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import RegisterRequest from '../../models/auth.register.request';
import AuthRequest from '../../models/auth.request.model';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private coreService: CoreService) { }

  public login(request: AuthRequest): Observable<any> {
    return new Observable((observer) => {
      this.coreService
        .post('/auth/authenticate', request)
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  public signUp(data: RegisterRequest): Observable<any> {
    return new Observable((observer) => {
      this.coreService
        .post('/auth/register', data)
        .then((response) => {
          observer.next(response);
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
          observer.complete();
        });
    });
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }
}
