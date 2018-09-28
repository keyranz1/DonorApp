import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPatientPage } from './edit-patient';

@NgModule({
  declarations: [
    EditPatientPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPatientPage),
  ],
})
export class EditPatientPageModule {}
