import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bmi',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './bmi.html',
  styleUrls: ['./bmi.css']
})
export class Bmi {
  heightCm = 0;

  weight = 0;

  bmi = 0;

  category = '';

  heightInFeet = '0 ft 0 in';

  get healthyRange(): string {
    if (!this.heightCm || this.heightCm <= 0) {
      return 'Enter your height to see the healthy range.';
    }

    const heightInMeters = this.heightCm / 100;
    const min = 18.5 * heightInMeters * heightInMeters;
    const max = 24.9 * heightInMeters * heightInMeters;

    return `${min.toFixed(1)} kg - ${max.toFixed(1)} kg`;
  }

  get categoryClass(): string {
    return this.category.toLowerCase().replace(' ', '-');
  }

  convertToFeet(): void {
    if (!this.heightCm || this.heightCm <= 0) {
      this.heightInFeet = '0 ft 0 in';
      return;
    }

    const totalInches = this.heightCm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);

    this.heightInFeet = `${feet} ft ${inches} in`;
  }

  calculateBMI(): void {
    if (!this.heightCm || !this.weight || this.heightCm <= 0 || this.weight <= 0) {
      this.bmi = 0;
      this.category = '';
      return;
    }

    const heightInMeters = this.heightCm / 100;
    const value = this.weight / (heightInMeters * heightInMeters);

    this.bmi = Number(value.toFixed(2));

    if (this.bmi < 18.5) {
      this.category = 'Underweight';
    } else if (this.bmi < 25) {
      this.category = 'Normal';
    } else if (this.bmi < 30) {
      this.category = 'Overweight';
    } else {
      this.category = 'Obese';
    }
  }
}
