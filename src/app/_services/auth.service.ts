import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { appValues } from '../app.values';
import { catchError, tap } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs/index';

import { CredentialsInterface } from '../_types/credentials.interface';

@Injectable()
export class AuthService {

  private baseUrl = [appValues.API_URL, appValues.APPLICATION_ID, appValues.API_KEY].join('/');
  private isUserLoggedIn = true;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(creds: CredentialsInterface, keepLogged: boolean, returnUrl: string): Promise<any> {
    this.clearUserData();

    return this.http.post(`${this.baseUrl}/users/login`, creds)
      .pipe(
        catchError(this.handleError),
        tap((resp: {}) => {
          this.isUserLoggedIn = true;
          this.saveUserData(resp, keepLogged);
          this.router.navigateByUrl(returnUrl || '/');
        })
      )
      .toPromise();
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    const msg = error.error
      ? error.error.message
      : error.message || error.statusText;

    window.console.error(`Error: ${msg}`);
    return throwError(msg);
  }

  get token(): string {
    let token;

    try {
      token = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'))['user-token'];
    } catch (e) {
      token = '';
    }
    return token;
  }

  private saveUserData(response: {}, keepLogged: boolean): void {
    keepLogged && window.localStorage.setItem('currentUser', JSON.stringify(response));
    window.sessionStorage.setItem('currentUser', JSON.stringify(response));
  }

  clearUserData(): void {
    window.localStorage.removeItem('currentUser');
    window.sessionStorage.removeItem('currentUser');
  }

}
