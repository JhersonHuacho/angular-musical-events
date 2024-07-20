import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textLimiter',
  standalone: true
})
export class TextLimiterPipe implements PipeTransform {

  transform(value: string, ...args: number[]): string {
    let limit = 50;
    if (args.length > 0) {
      limit = args[0];
    }
    let slicedValue = value;
    if (value.length > limit) {
      slicedValue = value.slice(0, limit) + '...';
    }
    return slicedValue;
  }

}
