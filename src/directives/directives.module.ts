import { NgModule } from '@angular/core';
import { DonorResponseDirective } from './donor-response/donor-response';
import { PatientPriorityDirective } from './patient-priority/patient-priority';
import { DraggableDirective } from './draggable/draggable';

@NgModule({
  declarations: [DonorResponseDirective,
    PatientPriorityDirective,
    DraggableDirective
  ],
  imports: [],
  exports: [DonorResponseDirective,
    PatientPriorityDirective,
    DraggableDirective
  ]
})
export class DirectivesModule {
}
