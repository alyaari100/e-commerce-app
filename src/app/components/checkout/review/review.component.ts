import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutService } from '../../../services/checkout.service';
import { MaskCardNumberPipe } from '../../../pipes/maskCardNumber.pipe';
import { MaskCVVPipe } from '../../../pipes/maskCVV.pipe';
 import { CartService } from '../../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { CartItem } from '../../../models/cart-item.model';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatCardModule, MatButtonModule, MaskCardNumberPipe, MaskCVVPipe],
  template: `
    <div>
      <h3>Review Order</h3>
      <div class="details-section">
        <h4>Shipping Details</h4>
        <p><strong>Full Name:</strong> {{ shippingData?.fullName }}</p>
        <p><strong>Address:</strong> {{ shippingData?.address }}</p>
        <p><strong>Postal Code:</strong> {{ shippingData?.postalCode }}</p>
      </div>

      <div class="details-section">
        <h4>Payment Details</h4>
        <p><strong>Card Number:</strong> {{ paymentData?.cardNumber | maskCardNumber }}</p>
        <p><strong>Expiry Date:</strong> {{ paymentData?.expiryDate  }}</p>
        <p><strong>CVV:</strong> {{ paymentData?.cvv | maskCVV }}</p>
      </div>

      <div class="details-section">
        
        
      <h3>Invoice</h3>
      <table mat-table [dataSource]="cartItems" class="mat-elevation-z2">
         <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Product Name </th>
          <td mat-cell *matCellDef="let item"> {{ item.product.name }} </td>
        </ng-container>

         <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef> Quantity </th>
          <td mat-cell *matCellDef="let item"> {{ item.quantity }} </td>
        </ng-container>

         <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef> Unit Price </th>
          <td mat-cell *matCellDef="let item"> {{ item.product.price | currency }} </td>
        </ng-container>

         <ng-container matColumnDef="total">
          <th mat-header-cell *matHeaderCellDef> Total </th>
          <td mat-cell *matCellDef="let item">
            {{ (item.product.price * item.quantity) | currency }}
          </td>
        </ng-container>

         <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <div class="invoice-total">
        <h4>Total: {{ totalPrice | currency }}</h4>
      </div>
 
      </div>

      <button mat-raised-button (click)="confirmPayment()" color="primary">Confirm</button>
    </div>
  `,
  styles: [`
    div {
      margin: 20px;
    }

    .details-section {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    .details-section h4 {
      margin-bottom: 10px;
    }

    .details-section p {
      margin: 5px 0;
    }
    mat-card {
        margin: 20px;
        padding: 20px;
      }

      table {
        width: 100%;
        margin-top: 20px;
      }

      .invoice-total {
        margin-top: 20px;
        text-align: right;
      }
  `],
})
export class ReviewComponent {
  cartItems:CartItem[]=[]
  shippingData: any;
  paymentData: any;
  totalPrice:number=0;
  displayedColumns: string[] = ['name', 'quantity', 'price', 'total'];
  constructor(private checkoutService: CheckoutService, private cartService  :CartService,
    private router: Router,

  ) {
    this.checkoutService.getShippingData().subscribe(data => (this.shippingData = data));
    this.checkoutService.getPaymentData().subscribe(data => (this.paymentData = data));
    cartService.getTotalPrice().subscribe(totalPrice => (this.totalPrice = totalPrice))
    cartService.getCartItems().subscribe(items => (this.cartItems = items))

  }
  confirmPayment() {
    this.cartService.clearCart();
    this.router.navigate(['/']);
  }
}
