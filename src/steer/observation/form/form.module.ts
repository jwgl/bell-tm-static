import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { RestModule } from 'core/rest';

import { StatusTextPipe } from '../shared/pipes/status';
import { TermTextPipe } from '../shared/pipes/term';

import { ScheduleModule } from './editor/schedule/schedule.module';
import { ObservationRoutingModule } from './form-routing.module';
import { ObservationViewComponent } from './form.component';
import { ObservationFormService } from './form.service';
import { ObservationItemComponent } from './item/item.component';
import { ObservationListComponent } from './list/form-list.component';
import { ObservationFormViewerComponent } from './shared/form-viewer.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/steer/users/${userId}/observations'),
        ObservationRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        ScheduleModule,
    ],
    declarations: [
        ObservationViewComponent,
        ObservationListComponent,
        ObservationItemComponent,
        ObservationFormViewerComponent,
        StatusTextPipe,
        TermTextPipe,
    ],
    providers: [
        ObservationFormService,
        {provide: 'TEACHER_TIMESLOT_API_URL', useValue: '/api/steer/teachers'},
        {provide: 'PLACE_TIMESLOT_API_URL', useValue: '/api/steer/places'},
        {provide: 'SCHEDULE_API_URL', useValue: '/api/steer/schedules'},
    ],
    bootstrap: [
        ObservationViewComponent,
    ],
})
export class ObservationFormModule { }
