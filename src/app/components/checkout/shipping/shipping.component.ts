import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CheckoutService } from '../../../services/checkout.service';
 
@Component({
  selector: 'app-shipping',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <form [formGroup]="shippingForm" (ngSubmit)="onSubmit()">
      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Full Name</mat-label>
        <input matInput formControlName="fullName" placeholder="Enter your name" />
        <mat-error *ngIf="shippingForm.get('fullName')?.invalid">Full Name is required.</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Address</mat-label>
        <textarea matInput formControlName="address" placeholder="Enter your address"></textarea>
        <mat-error *ngIf="shippingForm.get('address')?.invalid">Address is required.</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="form-field">
        <mat-label>Postal Code</mat-label>
        <input matInput formControlName="postalCode" placeholder="Enter postal code" />
        <mat-error *ngIf="shippingForm.get('postalCode')?.invalid">Postal Code is required.</mat-error>
      </mat-form-field>

      <button mat-raised-button color="primary" type="submit" [disabled]="shippingForm.invalid">
        Next
      </button>
    </form>
  `,
  styles: [`
    .form-field {
      width: 100%;
      margin-bottom: 16px;
    }
  `],
})
export class ShippingComponent {
  shippingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private checkoutService: CheckoutService
  ) {
    this.shippingForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      postalCode: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.shippingForm.valid) {
      this.checkoutService.setShippingData(this.shippingForm.value);
      this.router.navigate(['/checkout/payment']);
    }
  }
}
