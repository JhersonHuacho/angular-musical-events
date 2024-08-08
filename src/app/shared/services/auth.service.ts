import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  verifyLocalStorage() {
    const token = localStorage.getItem('token');
  }
}
