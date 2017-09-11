import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDirectivesModule } from 'core/common-directives';
import { Dialog } from 'core/dialogs';
import { RestModule } from 'core/rest';

import { ObservationFormService } from '../../form.service';
import { ObservationFormEditorComponent } from '../form-editor.component';

import { PlaceSelectComponent } from '../../../common/place-select.component';
import { TeacherSelectComponent } from '../../../common/teacher-select.component';
import { ObserverGroupPipe } from '../../../shared/pipes/observer-group';
import { TypeTextPipe } from '../../../shared/pipes/observer-type';
import { PagerPipe } from '../../../shared/pipes/pager';

import { ObservePriorityListComponent } from './list/observe-priority.component';
import { QueryOptionDialog } from './list/query-option.dialog';
import { ScheduleListComponent } from './list/schedule-list.component';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleViewComponent } from './schedule.component';
import { ScheduleService } from './schedule.service';
import { WeekScheduleComponent } from './week/form-view.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/steer/schedules'),
        ScheduleRoutingModule,
    ],
    declarations: [
        ScheduleViewComponent,
        TeacherSelectComponent,
        ObservePriorityListComponent,
        PlaceSelectComponent,
        QueryOptionDialog,
        ScheduleListComponent,
        ObservationFormEditorComponent,
        TypeTextPipe,
        WeekScheduleComponent,
        PagerPipe,
        ObserverGroupPipe,
    ],
    providers: [
        Dialog,
        ScheduleService,
        ObservationFormService,
    ],
    entryComponents: [
        QueryOptionDialog,
    ],
    exports: [
        ObservationFormEditorComponent,
        ScheduleListComponent,
        ScheduleViewComponent,
        TypeTextPipe,
        WeekScheduleComponent,
        PagerPipe,
        ObserverGroupPipe,
    ],
})
export class ScheduleModule { }
