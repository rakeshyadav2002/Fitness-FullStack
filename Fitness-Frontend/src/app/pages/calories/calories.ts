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
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-calories',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent
  ],
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

  deletingId = 0;

  mealTypes = [
    'Breakfast',
    'Lunch',
    'Dinner',
    'Snack',
    'Pre-workout',
    'Post-workout'
  ];

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

        error: () => {
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

        error: () => {
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
    this.deletingId = calorieId;

    this.calorieService.deleteCalorie(calorieId)
      .subscribe({
        next: () => {
          this.caloriesList =
            this.caloriesList.filter(
              item => item.calorieId !== calorieId);

          this.calculateTotalCalories();
          this.successMessage = 'Calorie record deleted successfully';
          this.deletingId = 0;
        },

        error: () => {
          this.errorMessage = 'Unable to delete calorie record';
          this.deletingId = 0;
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
