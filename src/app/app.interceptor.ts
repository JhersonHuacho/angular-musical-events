import { HttpInterceptorFn } from '@angular/common/http';
import { inject, isDevMode } from '@angular/core';
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

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  const token = localStorage.getItem('token');
  // Truthy and falsy in JavaScript: https://developer.mozilla.org/en-US/docs/Glossary/Truthy
  if (token) {
    //req.headers.set('Authorization', `Bearer ${token}`);
    clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }

  return next(clonedRequest);
};
