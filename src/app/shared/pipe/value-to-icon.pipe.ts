import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueToIcon'
})
export class ValueToIconPipe implements PipeTransform {

  
  transform(value: number): string {
   
    if (value === 0) {
      return 'close';
    } else if (value === 1) {
      return 'check';
    } else {
      return '';
    }
  }
}
