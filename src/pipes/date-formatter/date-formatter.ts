import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: string) {
    let year = value.slice(0, 4);
    let month = value.slice(5, 7);
    let day = value.slice(8, 10);
    return day + "-" + month + "-" + year;
  }
}
