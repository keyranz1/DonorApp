import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MessageForDonorPage } from './message-for-donor';
import {PipesModule} from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    MessageForDonorPage,
  ],
  imports: [
    IonicPageModule.forChild(MessageForDonorPage),
    PipesModule
  ],
})
export class MessageForDonorPageModule {}
