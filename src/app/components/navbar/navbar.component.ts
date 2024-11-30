import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterLink } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { map } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../guards/Auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',  
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <button mat-button [routerLink]="['/']" class="logo-button">
        <mat-icon>storefront</mat-icon>
        E-Commerce Store
      </button>
      <span class="spacer"></span>
      <button mat-icon-button *ngIf="isLogined" (click)="auth.logout()" aria-label="Logout">
        <mat-icon>exit_to_app</mat-icon>
      </button>
      <button mat-icon-button *ngIf="!isLogined" [routerLink]="['/login']" aria-label="Login">
        <mat-icon>login</mat-icon>
      </button>
      <button mat-icon-button [routerLink]="['/cart']" aria-label="Cart">
        <mat-icon [matBadge]="cartItemCount$ | async" matBadgeColor="warn">shopping_cart</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .navbar {
        padding: 0 20px;
      }

      .logo-button {
        font-weight: bold;
        display: flex;
        align-items: center;
      }

      .logo-button mat-icon {
        margin-right: 8px;
      }

      .spacer {
        flex: 1;
      }

      mat-icon {
        font-size: 24px;
      }

      .mat-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      button {
        margin: 0 10px;
      }
    `
  ]
})
export class NavbarComponent {
  cartItemCount$ = this.cartService.getCartItems().pipe(
    map(items => items.length)
  );
  isLogined: boolean = false;

  constructor(private cartService: CartService, public auth: AuthService) {
    console.log(environment.production);
    this.auth.isLoggedIn$.subscribe(res => {
      this.isLogined = res;
    });
  }
}
