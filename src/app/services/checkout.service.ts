import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private shippingDataSubject = new BehaviorSubject<any>(null);
  private paymentDataSubject = new BehaviorSubject<any>(null);

  setShippingData(data: any) {
    this.shippingDataSubject.next(data);
  }

  getShippingData() {
    return this.shippingDataSubject.asObservable();
  }

  setPaymentData(data: any) {
    this.paymentDataSubject.next(data);
  }

  getPaymentData() {
    return this.paymentDataSubject.asObservable();
  }
}
