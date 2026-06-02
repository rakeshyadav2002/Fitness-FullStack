import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

export type CalorieRecord = {
  calorieId: number;
  userId: number;
  foodName: string;
  mealType: string;
  calories: number;
  quantity: number;
  createdDate?: string;
};

export type CreateCalorieRequest = {
  userId: number;
  foodName: string;
  mealType: string;
  calories: number;
  quantity: number;
};

@Injectable({
  providedIn: 'root'
})
export class CalorieService {
  private apiUrl = `${environment.apiUrl}/Calorie`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addCalorie(data: CreateCalorieRequest): Observable<CalorieRecord> {
    return this.http.post<CalorieRecord>(
      this.apiUrl,
      data,
      this.getHeaders()
    );
  }

  getCalories(): Observable<CalorieRecord[]> {
    return this.http.get<CalorieRecord[]>(
      this.apiUrl,
      this.getHeaders()
    );
  }

  getCaloriesByUser(userId: number): Observable<CalorieRecord[]> {
    return this.http.get<CalorieRecord[]>(
      `${this.apiUrl}/user/${userId}`,
      this.getHeaders()
    );
  }

  deleteCalorie(calorieId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${calorieId}`,
      this.getHeaders()
    );
  }

  private getHeaders() {
    const token = this.authService.getToken();

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
}
