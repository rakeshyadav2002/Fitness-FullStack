import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

type JwtPayload = {
  UserId?: string;
  email?: string;
  exp?: number;
  role?: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/login`,
      data,
      {
        responseType: 'text'
      }
    );
  }

  register(data: any): Observable<string> {
    return this.http.post(
      `${this.apiUrl}/register`,
      data,
      {
        responseType: 'text'
      }
    );
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const payload = this.getTokenPayload();

    if (!token || !payload?.exp) {
      return false;
    }

    return payload.exp * 1000 > Date.now();
  }

  getUserId(): number | null {
    const userId = this.getTokenPayload()?.UserId;

    return userId ? Number(userId) : null;
  }

  private getTokenPayload(): JwtPayload | null {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(char => `%${(`00${char.charCodeAt(0).toString(16)}`).slice(-2)}`)
          .join('')
      );

      return JSON.parse(json);
    } catch {
      return null;
    }
  }
}
