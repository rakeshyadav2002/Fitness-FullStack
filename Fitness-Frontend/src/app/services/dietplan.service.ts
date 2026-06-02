import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

export type DietPlan = {
  dietPlanId: number;
  planName: string;
  goalType: string;
  caloriesPerDay: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};

@Injectable({
  providedIn: 'root'
})
export class DietPlanService {
  private apiUrl = `${environment.apiUrl}/DietPlan`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getDietPlans(): Observable<DietPlan[]> {
    return this.http.get<DietPlan[]>(
      this.apiUrl,
      this.getHeaders()
    );
  }

  getDietPlanById(id: number): Observable<DietPlan> {
    return this.http.get<DietPlan>(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  addDietPlan(data: DietPlan): Observable<DietPlan> {
    return this.http.post<DietPlan>(
      this.apiUrl,
      data,
      this.getHeaders()
    );
  }

  updateDietPlan(data: DietPlan): Observable<DietPlan> {
    return this.http.put<DietPlan>(
      this.apiUrl,
      data,
      this.getHeaders()
    );
  }

  deleteDietPlan(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
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
