import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  NgForm
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  CalorieRecord,
  CalorieService
} from '../../services/calorie.service';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './calories.html',
  styleUrl: './calories.css'
})
export class Calories implements OnInit {
  calorie: CalorieRecord = this.createEmptyCalorie();

  caloriesList: CalorieRecord[] = [];

  totalCalories = 0;

  successMessage = '';

  errorMessage = '';

  isSaving = false;

  private userId = 0;

  constructor(
    private calorieService: CalorieService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.authService.getUserId();

    if (!userId) {
      this.authService.logout();
      this.router.navigate(['/']);
      return;
    }

    this.userId = userId;
    this.calorie = this.createEmptyCalorie();
    this.loadCalories();
  }

  addCalorie(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid || this.isSaving) {
      this.errorMessage = 'Please enter all calorie details';
      return;
    }

    this.isSaving = true;

    const calorieToSave = {
      userId: this.userId,
      foodName: this.calorie.foodName.trim(),
      mealType: this.calorie.mealType.trim(),
      calories: Number(this.calorie.calories),
      quantity: Number(this.calorie.quantity)
    };

    this.calorieService.addCalorie(calorieToSave)
      .pipe(
        switchMap(() => this.calorieService.getCaloriesByUser(this.userId))
      )
      .subscribe({
        next: (data) => {
          this.caloriesList = data;
          this.calculateTotalCalories();
          this.calorie = this.createEmptyCalorie();
          form.resetForm(this.calorie);
          this.successMessage = 'Calorie added successfully';
          this.isSaving = false;
        },

        error: (err) => {
          console.log('POST ERROR', err);
          this.errorMessage = 'Unable to add calorie record';
          this.isSaving = false;
        }
      });
  }

  loadCalories(): void {
    this.calorieService.getCaloriesByUser(this.userId)
      .subscribe({
        next: (data) => {
          this.caloriesList = data;
          this.calculateTotalCalories();
          this.isSaving = false;
        },

        error: (err) => {
          console.log('GET ERROR', err);
          this.errorMessage = 'Unable to load calorie records';
          this.isSaving = false;
        }
      });
  }

  deleteCalorie(calorieId: number): void {
    const confirmed =
      confirm('Are you sure you want to delete this calorie record?');

    if (!confirmed) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.calorieService.deleteCalorie(calorieId)
      .subscribe({
        next: () => {
          this.caloriesList =
            this.caloriesList.filter(
              item => item.calorieId !== calorieId);

          this.calculateTotalCalories();
          this.successMessage = 'Calorie record deleted successfully';
        },

        error: (err) => {
          console.log('DELETE ERROR', err);
          this.errorMessage = 'Unable to delete calorie record';
        }
      });
  }

  private calculateTotalCalories(): void {
    this.totalCalories =
      this.caloriesList.reduce(
        (sum, item) => sum + Number(item.calories),
        0
      );
  }

  private createEmptyCalorie(): CalorieRecord {
    return {
      calorieId: 0,
      userId: this.userId,
      foodName: '',
      mealType: '',
      calories: 0,
      quantity: 0
    };
  }
}
