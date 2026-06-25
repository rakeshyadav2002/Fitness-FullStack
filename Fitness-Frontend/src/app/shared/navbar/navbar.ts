import {
  Component,
  inject
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ThemeToggleComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);

  private readonly router = inject(Router);

  userName = this.authService.getUserName();

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
