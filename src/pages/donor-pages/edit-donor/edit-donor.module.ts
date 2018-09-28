import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditDonorPage } from './edit-donor';

@NgModule({
  declarations: [
    EditDonorPage,
  ],
  imports: [
    IonicPageModule.forChild(EditDonorPage),
  ],
})
export class EditDonorPageModule {}
