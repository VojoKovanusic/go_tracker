import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'hoursPipe'})
export class HoursPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value / 3600000)
  }
}
