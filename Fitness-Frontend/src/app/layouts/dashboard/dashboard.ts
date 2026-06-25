import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { filter } from 'rxjs';
import { NavbarComponent } from '../../shared/navbar/navbar';
import { SidebarComponent } from '../../shared/sidebar/sidebar';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    NavbarComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);

  isDashboardHome = true;

  userName = this.authService.getUserName();

  cards = [
    {
      title: 'BMI',
      description: 'Check body mass index, category, and healthy range.',
      icon: 'bi-heart-pulse',
      tone: 'green',
      link: '/dashboard/bmi',
      metric: 'Body score'
    },
    {
      title: 'Calories',
      description: 'Log meals and understand your daily calorie intake.',
      icon: 'bi-fire',
      tone: 'coral',
      link: '/dashboard/calories',
      metric: 'Daily fuel'
    },
    {
      title: 'Diet Plans',
      description: 'Explore goal-based breakfast, lunch, dinner, and snack plans.',
      icon: 'bi-card-checklist',
      tone: 'amber',
      link: '/dashboard/dietplans',
      metric: 'Meal strategy'
    },
    {
      title: 'Profile',
      description: 'Review profile details and your current fitness baseline.',
      icon: 'bi-person-circle',
      tone: 'blue',
      link: '/dashboard/profile',
      metric: 'Member info'
    }
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateDashboardHomeState();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateDashboardHomeState());
  }

  private updateDashboardHomeState(): void {
    this.isDashboardHome = this.router.url === '/dashboard';
  }
}
