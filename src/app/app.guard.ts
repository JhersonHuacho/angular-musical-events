import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

export const isNotLogged: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const canContinue = authService.loggedIn() ? false : true;
  if (!canContinue) {
    console.log('You are already logged in');
  }
  return canContinue;
};
