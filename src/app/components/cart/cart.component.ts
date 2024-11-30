import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <mat-table [dataSource]="cartItems" *ngIf="cartItems.length">
        <ng-container matColumnDef="image">
          <mat-header-cell *matHeaderCellDef>Image</mat-header-cell>
          <mat-cell *matCellDef="let item">
            <img [src]="item.product.imageUrl" [alt]="item.product.name" class="product-image">
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="name">
          <mat-header-cell *matHeaderCellDef>Product</mat-header-cell>
          <mat-cell *matCellDef="let item">{{item.product.name}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="price">
          <mat-header-cell *matHeaderCellDef>Price</mat-header-cell>
          <mat-cell *matCellDef="let item">{{item.product.price | currency}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <mat-header-cell *matHeaderCellDef>Quantity</mat-header-cell>
          <mat-cell *matCellDef="let item">
            <button mat-icon-button (click)="updateQuantity(item.product.id, item.quantity - 1)">
              <mat-icon>remove</mat-icon>
            </button>
            {{item.quantity}}
            <button mat-icon-button (click)="updateQuantity(item.product.id, item.quantity + 1)">
              <mat-icon>add</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <ng-container matColumnDef="total">
          <mat-header-cell *matHeaderCellDef>Total</mat-header-cell>
          <mat-cell *matCellDef="let item">{{item.product.price * item.quantity | currency}}</mat-cell>
        </ng-container>

        <ng-container matColumnDef="actions">
          <mat-header-cell *matHeaderCellDef>Actions</mat-header-cell>
          <mat-cell *matCellDef="let item">
            <button mat-icon-button color="warn" (click)="removeItem(item.product.id)">
              <mat-icon>delete</mat-icon>
            </button>
          </mat-cell>
        </ng-container>

        <mat-header-row *matHeaderRowDef="displayedColumns"></mat-header-row>
        <mat-row *matRowDef="let row; columns: displayedColumns;"></mat-row>
      </mat-table>

      <div class="cart-summary" *ngIf="cartItems.length">
        <h3>Total: {{totalPrice | currency}}</h3>
        <button mat-raised-button color="primary" routerLink="/checkout">
          Proceed to Checkout
        </button>
      </div>

      <div class="empty-cart" *ngIf="!cartItems.length">
        <p>Your cart is empty</p>
        <button mat-raised-button color="primary" routerLink="/">
          Continue Shopping
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .product-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }
    .cart-summary {
      margin-top: 20px;
      text-align: right;
    }
    .empty-cart {
      text-align: center;
      padding: 40px;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice = 0;
  displayedColumns = ['image', 'name', 'price', 'quantity', 'total', 'actions'];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => this.cartItems = items);
    this.cartService.getTotalPrice().subscribe(total => this.totalPrice = total);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}