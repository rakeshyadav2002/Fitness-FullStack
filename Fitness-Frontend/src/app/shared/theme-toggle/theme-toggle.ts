import {
  Component,
  inject
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.css'
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);

  readonly currentTheme = this.themeService.theme;

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
