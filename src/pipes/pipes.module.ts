import { NgModule } from '@angular/core';
import { BloodTypePipe } from './blood-type/blood-type';
import { GenderDeciderPipe } from './gender-decider/gender-decider';
import { DonorResponsePipe } from './donor-response/donor-response';
import { PatientPriorityPipe } from './patient-priority/patient-priority';
import { DateFormatterPipe } from './date-formatter/date-formatter';
import { SorterPipe } from './sorter/sorter';
@NgModule({
	declarations: [BloodTypePipe,
    GenderDeciderPipe,
    DonorResponsePipe,
    PatientPriorityPipe,
    DateFormatterPipe,
    SorterPipe],
	imports: [],
	exports: [BloodTypePipe,
    GenderDeciderPipe,
    DonorResponsePipe,
    PatientPriorityPipe,
    DateFormatterPipe,
    SorterPipe]
})
export class PipesModule {}
