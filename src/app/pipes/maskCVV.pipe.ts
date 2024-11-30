import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCVV',
  standalone:true
})
export class MaskCVVPipe implements PipeTransform {
  transform(cvv: string): string {
    return cvv ? '***' : '';
  }
}
