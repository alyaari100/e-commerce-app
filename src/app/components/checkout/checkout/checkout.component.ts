import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { CheckoutService } from '../../../services/checkout.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [MatCardModule, RouterOutlet,MatStepperModule ],
  template: `
  
    <!-- <mat-horizontal-stepper linear>
      <mat-step (click)="navigateTo('shipping')" label="Shipping">
        <button mat-raised-button color="primary" (click)="navigateTo('shipping')">Go to Shipping</button>
      </mat-step>
      <mat-step (click)="navigateTo('payment')" label="Payment">
        <button mat-raised-button color="primary" (click)="navigateTo('payment')">Go to Payment</button>
      </mat-step>
      <mat-step  (click)="navigateTo('review')" label="Review">
        <button mat-raised-button color="primary" (click)="navigateTo('review')">Go to Review</button>
      </mat-step>
    </mat-horizontal-stepper> -->
    <div class="container">
    <router-outlet></router-outlet>
    </div>

   `,
  styles: [`
    .container {
      margin: 30px;}
 ` 
  ]
})
export class CheckoutComponent {


  constructor(private router: Router) {
    this.router.navigate(['/checkout/shipping']);
  }

  navigateTo(step: string) {
    this.router.navigate([`/checkout/${step}`]);
}

}
