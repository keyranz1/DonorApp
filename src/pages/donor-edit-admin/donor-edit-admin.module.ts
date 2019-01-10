import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonorEditAdminPage } from './donor-edit-admin';

@NgModule({
  declarations: [
    DonorEditAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(DonorEditAdminPage),
  ],
})
export class DonorEditAdminPageModule {}
