import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { DashboardComponent } from './layouts/dashboard/dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    children: [
      {
        path: 'bmi',
        loadComponent: () =>
          import('./pages/bmi/bmi')
            .then(m => m.Bmi)
      },
      {
        path: 'calories',
        loadComponent: () =>
          import('./pages/calories/calories')
            .then(m => m.Calories)
      },
      {
        path: 'dietplans',
        loadComponent: () =>
          import('./pages/dietplans/dietplans')
            .then(m => m.Dietplans)
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile')
            .then(m => m.Profile)
      }
    ]
  },
  {
    path: 'bmi',
    redirectTo: 'dashboard/bmi'
  },
  {
    path: 'calories',
    redirectTo: 'dashboard/calories'
  },
  {
    path: 'dietplans',
    redirectTo: 'dashboard/dietplans'
  },
  {
    path: 'profile',
    redirectTo: 'dashboard/profile'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
