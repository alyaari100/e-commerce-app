import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/Account/Login/Login.component';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'checkout',
    loadChildren: () => import('./components/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES),
    canActivate: [AuthGuard]
  }
];