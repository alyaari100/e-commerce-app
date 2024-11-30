import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCardNumber',
  standalone:true
})


export class MaskCardNumberPipe implements PipeTransform {
  transform(cardNumber: string): string {
    if (!cardNumber) return '';
    return cardNumber.replace(/\d(?=\d{4})/g, '*');
  }
}
