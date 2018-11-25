import { Pipe, PipeTransform } from '@angular/core';
import {Message} from "../../types/message";
import {Donor} from "../../types/donor";

/**
 * Generated class for the SorterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sorter',
})
export class SorterPipe implements PipeTransform {

  transform(value: any[], ...args) {

  }
}
