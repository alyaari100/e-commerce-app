import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutService } from '../../../services/checkout.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule 
  ],
  template: `
    <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill">
        <mat-label>Card Number</mat-label>
        <input
          matInput
          formControlName="cardNumber"
          placeholder="Enter card number"
        />
        <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('required')">
          Card number is required.
        </mat-error>
        <mat-error *ngIf="paymentForm.get('cardNumber')?.hasError('pattern')">
          Card number must be 16 digits.
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>Expiry Date (MM/YY)</mat-label>
        <input
          matInput
          formControlName="expiryDate"
          placeholder="MM/YY"
        />
        <mat-error *ngIf="paymentForm.get('expiryDate')?.hasError('required')">
          Expiry date is required.
        </mat-error>
        <mat-error
          *ngIf="paymentForm.get('expiryDate')?.hasError('invalidExpiry')"
        >
          Enter a valid expiry date.
        </mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill">
        <mat-label>CVV</mat-label>
        <input
          matInput
          formControlName="cvv"
          placeholder="Enter CVV"
          type="password"
        />
        <mat-error *ngIf="paymentForm.get('cvv')?.hasError('required')">
          CVV is required.
        </mat-error>
        <mat-error *ngIf="paymentForm.get('cvv')?.hasError('pattern')">
          CVV must be 3 or 4 digits.
        </mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="paymentForm.invalid">
        Next
      </button>
    </form>
  `,
  styles: [
    `
      mat-form-field {
        display: block;
        margin-bottom: 16px;
      }
    `,
  ],
})
export class PaymentComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder,
    private router: Router,
     private checkoutService: CheckoutService) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiryDate: ['02/2024', [Validators.required, this.expiryDateValidator]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.checkoutService.setPaymentData(this.paymentForm.value);
      this.router.navigate(['/checkout/review']);
    }
  }

  expiryDateValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
  
    const parts = value.split('/');
    if (parts.length !== 2) return { invalidExpiry: true };
  
    const month = parseInt(parts[0], 10);
    const year = parseInt(parts[1], 10) + 2000;  
  
    if (isNaN(month) || isNaN(year)) return { invalidExpiry: true };
  
    if (month < 1 || month > 12) return { invalidExpiry: true };
  
    const currentDate = new Date();
    const inputDate = new Date(year, month - 1);
  
    return inputDate >= currentDate ? null : { invalidExpiry: true };
  }
  
}
