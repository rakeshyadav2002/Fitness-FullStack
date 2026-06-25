import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [RouterOutlet],

  templateUrl: './app.html',

  styleUrls: ['./app.css']
})

export class AppComponent {

  title = 'Fitness-Frontend';

  constructor(private themeService: ThemeService) { }
}
