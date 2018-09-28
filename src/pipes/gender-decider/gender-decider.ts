import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genderDecider',
})
export class GenderDeciderPipe implements PipeTransform {

  transform(gender: any): string {
    gender = parseInt(gender);
    switch (gender) {
      case 0:
        return "app-man";
      case 1:
        return "app-girl";
      default:
        return "app-unknown";
    }
  }
}
