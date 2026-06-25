import { CommonModule } from '@angular/common';
import {
  Component,
  inject
} from '@angular/core';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  private readonly authService = inject(AuthService);

  user = {
    name: this.authService.getUserName(),
    email: this.authService.getUserEmail(),
    age: 25,
    gender: 'Male',
    height: 170,
    weight: 70,
    goal: 'Build strength and maintain a lean routine'
  };

  profileStats = [
    {
      label: 'Height',
      value: `${this.user.height} cm`,
      icon: 'bi-arrows-vertical'
    },
    {
      label: 'Weight',
      value: `${this.user.weight} kg`,
      icon: 'bi-speedometer'
    },
    {
      label: 'Age',
      value: `${this.user.age}`,
      icon: 'bi-calendar-heart'
    }
  ];

}
