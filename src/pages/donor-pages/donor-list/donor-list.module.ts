import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DonorListPage } from './donor-list';
import { PipesModule } from "../../../pipes/pipes.module";
import { DirectivesModule } from "../../../directives/directives.module";

@NgModule({
  declarations: [
    DonorListPage,
  ],
  imports: [
    IonicPageModule.forChild(DonorListPage), PipesModule, DirectivesModule
  ],
})
export class DonorListPageModule {
}
