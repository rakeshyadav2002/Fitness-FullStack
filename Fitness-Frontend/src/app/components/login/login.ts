import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { LoadingSpinnerComponent } from '../../shared/loading-spinner/loading-spinner';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    LoadingSpinnerComponent,
    ThemeToggleComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  rememberMe = true;
  showPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  login(form: NgForm): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (form.invalid) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.isLoading = true;

    this.authService.login({
      email: this.loginData.email.trim(),
      password: this.loginData.password
    })
      .subscribe({
        next: (response) => {
          this.isLoading = false;

          this.authService.saveToken(response);

          this.successMessage = 'Login successful. Opening dashboard...';

          this.router.navigate(['/dashboard']);
        },

        error: (err) => {
          this.isLoading = false;

          console.log('LOGIN ERROR', err);

          if (err.status === 401) {
            this.errorMessage =
              'Email is not registered or password is incorrect.';
          }
          else if (err.status === 500) {
            this.errorMessage =
              'Server error. Please try again.';
          }
          else {
            this.errorMessage =
              'Unable to login. Please try again.';
          }

          this.cd.detectChanges();
        }
      });
  }

  forgotPassword(): void {
    alert('Forgot password feature will be added soon.');
  }
}