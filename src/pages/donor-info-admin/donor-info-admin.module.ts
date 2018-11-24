import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonorInfoAdminPage } from './donor-info-admin';
import {DirectivesModule} from "../../directives/directives.module";
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    DonorInfoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(DonorInfoAdminPage),
    DirectivesModule,
    PipesModule
  ],
})
export class DonorInfoAdminPageModule {}

