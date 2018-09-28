import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddDonorPage } from './add-donor';

@NgModule({
  declarations: [
    AddDonorPage,
  ],
  imports: [
    IonicPageModule.forChild(AddDonorPage)
  ],
})
export class AddDonorPageModule {
}
