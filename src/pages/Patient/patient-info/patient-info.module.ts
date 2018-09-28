import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientInfoPage } from './patient-info';
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  declarations: [
    PatientInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientInfoPage), PipesModule, DirectivesModule
  ],
})
export class PatientInfoPageModule {}
