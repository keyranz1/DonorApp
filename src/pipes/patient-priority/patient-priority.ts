import { Pipe, PipeTransform } from '@angular/core';
import {Priority} from "../../enums/priority";

@Pipe({
  name: 'patientPriority',
})
export class PatientPriorityPipe implements PipeTransform {

  transform(value: string): string {
    let priorityNum = parseInt(value);
    switch(priorityNum){
      case Priority.Urgent:
        return 'app-urgent';
      case Priority.Regular:
        return 'app-regular';
      case Priority.Backup:
        return 'app-backup';
    }
  }
}
