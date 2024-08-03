import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { tap } from 'rxjs';

export const loggerInterceptor: HttpInterceptorFn = (req, next) => {
  if (isDevMode()) {
    console.log('Request URL:', req.url);
    if (req.method === 'POST') {
      console.log('Request Body:', req.body);
    }
  }

  return isDevMode()
  ? next(req).pipe(
    tap(res => console.log('Response:', res)),
  )
  : next(req);
};
