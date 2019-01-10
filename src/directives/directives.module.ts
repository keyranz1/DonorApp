import { NgModule } from '@angular/core';
import { DonorResponseDirective } from './donor-response/donor-response';
import { PatientPriorityDirective } from './patient-priority/patient-priority';
import { DraggableDirective } from './draggable/draggable';
import { InfoCardDirective } from './info-card/info-card';

@NgModule({
  declarations: [DonorResponseDirective,
    PatientPriorityDirective,
    DraggableDirective,
    InfoCardDirective
  ],
  imports: [],
  exports: [DonorResponseDirective,
    PatientPriorityDirective,
    DraggableDirective,
    InfoCardDirective
  ]
})
export class DirectivesModule {
}
