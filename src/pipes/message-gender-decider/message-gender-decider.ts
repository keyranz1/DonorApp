import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the MessageGenderDeciderPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'messageGenderDecider',
})
export class MessageGenderDeciderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(gender: any): string {
    if(gender !== undefined){
      gender = parseInt(gender);
      switch (gender) {
        case 0:
          return "../../assets/icon/man.svg";
        case 1:
          return "../../assets/icon/girl.svg";
        default:
          return "http://www.kylevu.com/images/loginUser.png";
      }
    }

  }
}
