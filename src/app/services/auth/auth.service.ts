import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private coreService: CoreService) {}

  public login(data: any): Observable<any> {
    return new Observable((observer) => {
      this.coreService
        .post('/auth/authenticate', data)
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

  public signUp(data: any): Observable<any> {
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
