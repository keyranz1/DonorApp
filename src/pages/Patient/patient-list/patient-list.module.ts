import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientListPage } from "./patient-list";
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  declarations: [PatientListPage],
  imports: [
    IonicPageModule.forChild(PatientListPage), PipesModule, DirectivesModule
  ],
})
export class PatientListModule {}
