import { Component } from '@angular/core';

import { FormsModule }
from '@angular/forms';

import { CommonModule }
from '@angular/common';

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

  height = 0;

  weight = 0;

  bmi = 0;

  category = '';

  calculateBMI() {

    this.bmi =
      this.weight /
      (this.height * this.height);

    this.bmi =
      Number(this.bmi.toFixed(2));

    if (this.bmi < 18.5) {

      this.category = 'Underweight';
    }

    else if (this.bmi < 25) {

      this.category = 'Normal';
    }

    else if (this.bmi < 30) {

      this.category = 'Overweight';
    }

    else {

      this.category = 'Obese';
    }
  }
}