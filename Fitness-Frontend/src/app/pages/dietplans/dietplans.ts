import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  DietPlan,
  DietPlanService
} from '../../services/dietplan.service';

import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner';

@Component({
  selector: 'app-dietplans',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './dietplans.html',
  styleUrl: './dietplans.css'
})
export class Dietplans implements OnInit {

  dietPlans: DietPlan[] = [];

  errorMessage = '';

  isLoading = false;

  constructor(
    private dietPlanService: DietPlanService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadDietPlans();
  }

  loadDietPlans(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.cd.detectChanges();

    this.dietPlanService
      .getDietPlans()
      .subscribe({

        next: (data) => {

          console.log('DIET PLANS DATA:', data);

          this.dietPlans = data ? [...data] : [];

          this.isLoading = false;

          this.errorMessage = '';

          this.cd.detectChanges();
        },

        error: (err) => {

          console.log('DIET PLANS ERROR:', err);

          this.dietPlans = [];

          this.isLoading = false;

          if (err.status === 401) {
            this.errorMessage =
              'Session expired. Please login again.';
          }
          else {
            this.errorMessage =
              'Unable to load diet plans.';
          }

          this.cd.detectChanges();
        }

      });
  }
}