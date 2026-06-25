import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormsModule,
  NgForm
} from '@angular/forms';
import {
  Router,
  RouterLink
} from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../services/auth';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LoadingSpinnerComponent,
    ThemeToggleComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerData = {
    userId: 0,
    fullName: '',
    email: '',
    password: ''
  };

  confirmPassword = '';

  showPassword = false;

  showConfirmPassword = false;

  isLoading = false;

  successMessage = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  get passwordsMatch(): boolean {
    return this.registerData.password === this.confirmPassword;
  }

  get passwordStrength(): { label: string; level: string; score: number } {
    const password = this.registerData.password;
    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    if (!password) {
      return { label: 'Add a password', level: 'empty', score: 0 };
    }

    if (score <= 1) {
      return { label: 'Weak', level: 'weak', score: 25 };
    }

    if (score <= 3) {
      return { label: 'Good', level: 'good', score: 68 };
    }

    return { label: 'Strong', level: 'strong', score: 100 };
  }

  register(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid || this.isLoading) {
      this.errorMessage = 'Please complete all required account details.';
      return;
    }

    if (!this.passwordsMatch) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;

    this.authService
      .register({
        userId: 0,
        fullName: this.registerData.fullName.trim(),
        email: this.registerData.email.trim(),
        password: this.registerData.password
      })
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response) => {
          if (!response.toLowerCase().includes('success')) {
            this.errorMessage = response;
            return;
          }

          this.successMessage = 'Account created. Redirecting to login...';
          setTimeout(() => this.router.navigate(['/']), 600);
        },
        error: () => {
          this.errorMessage = 'Registration failed. Try a different email or try again.';
        }
      });
  }
}
