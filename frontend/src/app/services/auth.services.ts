import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/userroute'; 
  private tokenKey = 'token'; 

  constructor(private http: HttpClient, private router: Router) { }

  
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  
  login(user: User): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, user).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token); 
        this.router.navigate(['/home']); 
      }),
      catchError(err => {
        console.error('Login error:', err); 
        return throwError(err);
      })
    );
  }

  
  logout(): void {
    localStorage.removeItem(this.tokenKey); 
    this.router.navigate(['/login']); 
  }

  
  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey); 
  }

  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  
  getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  
  isTokenExpired(): boolean {
    const token = this.getDecodedToken();
    if (!token || !token.exp) {
      return true;
    }
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(token.exp);
    return expirationDate < new Date();
  }
}
