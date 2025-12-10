import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatPipe'
})
export class NumberFormatPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
