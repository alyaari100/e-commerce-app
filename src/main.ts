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
import { routes } from './app/app.routes';
import { CartService } from './app/services/cart.service';
import { map } from 'rxjs';
import { AuthService } from './app/guards/Auth.service';
import { environment } from './environments/environment';
import { NavbarComponent } from './app/components/navbar/navbar.component';
 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    NavbarComponent
  ],
  template: `
   <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
  `]
})
export class App {
   
 
}

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideAnimations()
  ]
});