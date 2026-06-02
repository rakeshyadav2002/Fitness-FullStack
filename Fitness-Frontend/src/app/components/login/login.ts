import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import {
  Router,
  RouterLink
} from '@angular/router';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})

export class LoginComponent {

  loginData = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {

    this.authService
      .login(this.loginData)
      .subscribe({

        next: (response) => {

          this.authService.saveToken(response);

          alert('Login Successful');

          this.router.navigate(['/dashboard']);
        },

        error: (error) => {

          console.log(error);

          alert('Login Failed');
        }
      });
  }
}
