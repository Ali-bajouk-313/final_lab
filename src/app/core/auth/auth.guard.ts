import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService)
  const router =inject(Router)
  if(auth.gettoken()){
      return true;
  }
  if(auth.isAuthenticated()){
    return true;
  }
  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url
    }
  });
};
