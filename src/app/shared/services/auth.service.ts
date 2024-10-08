import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { catchError, Observable, of } from 'rxjs';
import { ChangePasswordApiResponse, ForgotPasswordApiResponse, ForgotPasswordRequestBody, LoginApiResponse, LoginRequestBody, RegisterApiResponse, RegisterRequestBody } from '../models/auth.mode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private baseUrl = environment.baseUrl;
  loggedIn = signal(false);
  isAdministrator = signal(false);

  notifications = inject(NotificationsService);

  login(email: string, password: string): Observable<LoginApiResponse> {
    const apiUrl = this.baseUrl + '/api/users/login';
    const body: LoginRequestBody = { username: email, password };
    return this.http.post<LoginApiResponse>(apiUrl, body).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: LoginApiResponse = {
          success: false,
          data: { expirationDate: '', token: '' },
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
  logout() {
    localStorage.clear();
    this.loggedIn.set(false);
    this.isAdministrator.set(false);
    this.notifications.success('Logout exitoso', 'Hasta luego');
  }

  verifyLocalStorage() {
    const token = localStorage.getItem('token');
    this.loggedIn.set(token ? true : false);

    const isAdministrator = localStorage.getItem('isAdministrator');
    this.isAdministrator.set(isAdministrator === 'true');
  }

  register(body: RegisterRequestBody): Observable<RegisterApiResponse> {
    const apiUrl = this.baseUrl + '/api/users/register';
    return this.http.post<RegisterApiResponse>(apiUrl, body).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: RegisterApiResponse = {
          success: false,
          data: { expirationDate: '', token: '', userId: '' },
          errorMessage: httpErrorResponse.error.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }

  forgotPassword(email: string): Observable<ForgotPasswordApiResponse> {
    const apiUrl = this.baseUrl + '/api/users/RequestTokenToResetPassword';
    const body: ForgotPasswordRequestBody = { email };
    return this.http.post<ForgotPasswordApiResponse>(apiUrl, body).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: ForgotPasswordApiResponse = {
          success: false,
          errorMessage:
            httpErrorResponse.error?.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }

  changePassword(oldPassword: string, newPassword: string): Observable<ChangePasswordApiResponse> {
    const apiUrl = this.baseUrl + '/api/users/ChangePassword';
    const body = { oldPassword, newPassword };
    return this.http.post<ChangePasswordApiResponse>(apiUrl, body).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        const errorResponse: ChangePasswordApiResponse = {
          success: false,
          errorMessage:
            httpErrorResponse.error?.errorMessage || 'Unknown error',
        };
        return of(errorResponse);
      })
    );
  }
}
