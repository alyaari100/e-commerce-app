import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatPaginatorModule,
  ],
  template: `
    <div class="product-grid">
      <mat-grid-list cols="3" rowHeight="400px" gutterSize="16px">
        <mat-grid-tile *ngFor="let product of paginatedProducts">
          <mat-card class="product-card">
            <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
            <mat-card-content>
              <h2>{{ product.name }}</h2>
              <p>{{ product.price | currency }}</p>
            </mat-card-content>
            <mat-card-actions class="d-flex-around ">
              <button mat-button color="secondary" [routerLink]="['/product', product.id]">View Details</button>
              <button mat-raised-button color="primary" (click)="addToCart(product)">Add to Cart</button>
            </mat-card-actions>
          </mat-card>
        </mat-grid-tile>
      </mat-grid-list>

      <!-- Paginator -->
      <mat-paginator
        [length]="products.length"
        [pageSize]="pageSize"
        [pageSizeOptions]="pageSizeOptions"
        (page)="onPageChange($event)">
      </mat-paginator>
    </div>
  `,
  styles: [
    `
      .product-grid {
        padding: 20px;
      }
      .product-card {
        width: 300px;
        margin: 16px;
      }
      .mat-card-image {
        height: 200px;
        object-fit: cover;
      }
      mat-paginator {
        margin: 20px auto;
        display: flex;
        justify-content: center;
      }

      img.mat-mdc-card-image.mdc-card__media {
    height: 230px;
}
    `,
  ],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  pageSize = 6;
  pageSizeOptions = [3, 6, 9];
  currentPageIndex = 0;
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.updatePaginatedProducts();
    });
  }

  addToCart(product: Product): void {
    
    this.cartService.addToCart(product);
    this._snackBar.open('product added to the cart', 'close', {
      duration: this.durationInSeconds * 100,
    });
  }
   

  updatePaginatedProducts(): void {
    const startIndex = this.currentPageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.currentPageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePaginatedProducts();
  }
}
