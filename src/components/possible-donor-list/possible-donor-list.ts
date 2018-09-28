import { Component } from '@angular/core';

/**
 * Generated class for the PossibleDonorListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'possible-donor-list',
  templateUrl: 'possible-donor-list.html'
})
export class PossibleDonorListComponent {

  text: string;

  constructor() {
    console.log('Hello PossibleDonorListComponent Component');
    this.text = 'Hello World';
  }

}
