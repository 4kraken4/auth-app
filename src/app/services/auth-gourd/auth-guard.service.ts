import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export function authGuardFactory(
  authService: AuthService,
  router: Router
): () => Promise<boolean> {
  return async () => {
    const isAuthenticated = authService.isAuthenticated();
    if (!isAuthenticated) {
      router.navigate(['/login']);
    }
    return isAuthenticated;
  };
}

export const AuthGuard = {
  provide: 'AuthGuard',
  useFactory: authGuardFactory,
  deps: [AuthService, Router],
};
