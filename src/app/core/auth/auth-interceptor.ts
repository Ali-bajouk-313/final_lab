import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.gettoken();

  if (token) {

    req = req.clone({

      setHeaders: {

        Authorization: `Bearer ${token}`

      }

    });

  }

  return next(req).pipe(

    catchError(error => {
      if (
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/register')
      ) {
        return throwError(() => error);
      }
      switch (error.status) {

        case 400:
          router.navigate(['/error', 400]);
          break;

        case 401:
          auth.logout();
          router.navigate(['/error', 401]);
          break;

        case 403:
          router.navigate(['/error', 403]);
          break;

        case 404:
          router.navigate(['/error', 404]);
          break;

        case 500:
          router.navigate(['/error', 500]);
          break;

        default:
          router.navigate(['/error', error.status]);
          break;

      }

      return throwError(() => error);

    })

  );

};