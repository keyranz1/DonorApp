import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bloodType',
})
export class BloodTypePipe implements PipeTransform {

  transform(num: string): string {
    let value = parseInt(num);
    switch (value) {
      case 0:
        return "A+ve";
      case 1:
        return "A-ve";
      case 2:
        return "Ab+ve";
      case 3:
        return "Ab-ve";
      case 4:
        return "B+ve";
      case 5:
        return "B-ve";
      case 6:
        return "O+ve";
      case 7:
        return "O-ve";
      default:
        return "Data Not Found";
    }
  }
}
