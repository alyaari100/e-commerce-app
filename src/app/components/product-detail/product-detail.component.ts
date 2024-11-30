import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink, MatListModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <mat-card class="product-card">
        <img mat-card-image [src]="product.imageUrl" [alt]="product.name" class="product-image">
        <mat-card-content>
          <h2 class="product-name">{{ product.name }}</h2>
          <p class="product-description">{{ product.description }}</p>
          <h3 class="product-price">Price: {{ product.price | currency }}</h3>
          <h3>Specifications:</h3>
          <mat-list class="product-specs">
            <mat-list-item *ngFor="let spec of product.specifications">
              {{ spec }}
            </mat-list-item>
          </mat-list>
        </mat-card-content>
        <mat-card-actions class="card-actions d-flex-around ">
          <button mat-raised-button color="primary" (click)="addToCart()" class="add-to-cart-btn">Add to Cart</button>
          <button mat-raised-button color="secondary" [routerLink]="['/']" routerLinkActive="router-link-active"  class="add-to-cart-btn">Back</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-detail {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }

    .product-card {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: scale(1.02);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      height: 400px;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
    }

    .product-name {
      font-size: 1.6rem;
      font-weight: 500;
      margin: 10px 0;
      color: #333;
    }

    .product-description {
      font-size: 1.1rem;
      color: #666;
      line-height: 1.6;
    }

    .product-price {
      font-size: 1.3rem;
      font-weight: 600;
      color: #1976d2;
      margin-top: 10px;
    }

    .product-specs {
      margin-top: 20px;
      list-style-type: disc;
      padding-left: 20px;
    }

    .product-specs mat-list-item {
      font-size: 1.1rem;
      color: #555;
    }

    .card-actions {
      display: flex;
      justify-content: flex-end;
    }

    .add-to-cart-btn {
      font-size: 1rem;
      padding: 10px 20px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }

    .add-to-cart-btn:hover {
      background-color: #1565c0;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(productId).subscribe(
      product => this.product = product
    );
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product);
    }
  }
}
