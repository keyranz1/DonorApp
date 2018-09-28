import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonorInfoPage } from './donor-info';
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  declarations: [
    DonorInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DonorInfoPage), PipesModule, DirectivesModule
  ],
})
export class DonorInfoPageModule {}
