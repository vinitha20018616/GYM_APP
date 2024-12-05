import { Component } from '@angular/core';

@Component({
  selector: 'bmi-root',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.css']
})
export class BmiComponent {
  heightCm: number | null = null;
  weightKg: number | null = null;
  bmi: number | null = null;
  category: string = '';

  
  calculateBMI(): void {
    if (this.heightCm && this.weightKg && this.heightCm > 0 && this.weightKg > 0) {
      
      const heightM = this.heightCm / 100;

      
      this.bmi = this.weightKg / (heightM * heightM);

      
      if (this.bmi < 18.5) {
        this.category = 'You are underweight.';
      } else if (this.bmi >= 18.5 && this.bmi < 24.9) {
        this.category = 'You have a normal weight.';
      } else if (this.bmi >= 25 && this.bmi < 29.9) {
        this.category = 'You are overweight.';
      } else {
        this.category = 'You are obese.';
      }
    } else {
      alert('Please enter valid values for height and weight.');
    }
  }
}
