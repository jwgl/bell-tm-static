import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { WeekScheduleMode } from '../../shared/schedule-mode.model';
import { ObservationFormEditorComponent } from '../form-editor.component';

import { ObservePriorityListComponent } from './list/observe-priority.component';
import { ScheduleListComponent } from './list/schedule-list.component';
import { WeekScheduleComponent } from './week/form-view.component';

const routes: Routes = [
    { path: '', redirectTo: '/weekt', pathMatch: 'full' },
    {
        path: 'teacher/:teacherId/week/:week/timeslot/:timeslotId',
        component: ObservationFormEditorComponent,
        data: { mode: EditMode.Create },
    },
    { path: 'list', component: ScheduleListComponent },
    { path: 'weekt', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Teacher } },
    { path: 'weekp', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Place } },
    { path: 'activelist', component: ObservePriorityListComponent },
    { path: ':id/weekt', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Teacher } },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class ScheduleRoutingModule { }
