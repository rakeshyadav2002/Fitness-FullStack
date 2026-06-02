import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  DietPlan,
  DietPlanService
} from '../../services/dietplan.service';

@Component({
  selector: 'app-dietplans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dietplans.html',
  styleUrl: './dietplans.css'
})
export class Dietplans implements OnInit {
  dietPlans: DietPlan[] = [];

  errorMessage = '';

  isLoading = false;

  constructor(private dietPlanService: DietPlanService) { }

  ngOnInit(): void {
    this.loadDietPlans();
  }

  loadDietPlans(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.dietPlanService.getDietPlans()
      .subscribe({
        next: (data) => {
          this.dietPlans = data;
          this.isLoading = false;
        },

        error: (err) => {
          console.log('DIET PLAN GET ERROR', err);
          this.errorMessage = 'Unable to load diet plans';
          this.isLoading = false;
        }
      });
  }
}
