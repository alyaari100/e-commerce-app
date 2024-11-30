import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../guards/Auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  template: `
    <mat-card class="login-card">
      <mat-card-title class="login-title">Login</mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Username</mat-label>
            <input matInput formControlName="username" required />
            <mat-error *ngIf="loginForm.get('username')?.hasError('required')">
              Username is required
            </mat-error>
          </mat-form-field>
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Password</mat-label>
            <input matInput type="password" formControlName="password" required />
            <mat-error *ngif="loginForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>
          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
            Login
          </button>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      .login-card {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
      }

      .login-title {
        text-align: center;
        margin-bottom: 20px;
        font-size: 24px;
        font-weight: bold;
      }

      .form-field {
        width: 100%;
        margin-bottom: 16px;
      }

      button {
        display: block;
        width: 100%;
        margin-top: 20px;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  returnUrl: string = '/';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      username: ['user', Validators.required],
      password: ['password', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    const { username, password } = this.loginForm.value;
    if (this.authService.login(username, password)) {
      this.snackBar.open('Login successful!', 'Close', { duration: 2000 });
      this.router.navigate([this.returnUrl]);  
    } else {
      this.snackBar.open('Invalid credentials. Please try again.', 'Close', { duration: 2000 });
    }
  }
}
