import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatPie'
})
export class NumberFormatPiePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
