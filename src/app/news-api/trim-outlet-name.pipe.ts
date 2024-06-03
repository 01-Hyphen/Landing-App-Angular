import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimOutletName'
})
export class TrimOutletNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const index = value.indexOf('-');
    return value.slice(0,index);

  }

}
