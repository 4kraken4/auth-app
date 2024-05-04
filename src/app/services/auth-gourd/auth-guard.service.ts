import { Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../handlers/notification/notification.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree => {
  const authService = Inject(AuthService)
  const isAuthenticated = authService.isAuthenticated();
  const notify = Inject(NotificationService);
  const router = Inject(Router);
  if (isAuthenticated) {
    route.data = { isAuthenticated: true };
    state.url = '/home';
    router.navigate(['home']);
  } else {
    route.data = { isAuthenticated: false };
    state.url = '/login';
    notify.error('You are not authorized to access this page', 'Unauthorized');
    router.navigate(['login']);
  }
  return isAuthenticated;
}

export const canActivateChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => authGuard(route, state);