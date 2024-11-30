import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  constructor(){
    this.isLoggedInSubject.next(localStorage.getItem('isAuthenticated')=='true')
  }
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(username: string, password: string): boolean {
    
    if (username === 'user' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      this.isLoggedInSubject.next(true);
      return true;
    }
    this.isLoggedInSubject.next(false);
    return false;
  }

  logout(): void {
    
    localStorage.removeItem('isAuthenticated');
    this.isLoggedInSubject.next(false);
    window.location.reload();
  }
}
