import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  user = {
    name: 'Rakesh Yadav',
    email: 'rakesh@gmail.com',
    age: 25,
    gender: 'Male',
    height: 170,
    weight: 70
  };

}