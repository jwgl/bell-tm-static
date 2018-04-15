import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditMode } from 'core/constants';

import { ObservationFormEditorComponent } from './editor/form-editor.component';
import { ObservePriorityListComponent } from './editor/schedule/list/observe-priority.component';
import { ScheduleListComponent } from './editor/schedule/list/schedule-list.component';
import { WeekScheduleComponent } from './editor/schedule/week/form-view.component';
import { ObservationSpecial } from './editor/unschedule/form.component';
import { TaskListComponent } from './editor/unschedule/task-list.component';
import { ObservationItemComponent } from './item/item.component';
import { ObservationListComponent } from './list/form-list.component';
import { WeekScheduleMode } from './shared/schedule-mode.model';

const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    { path: 'list', component: ObservationListComponent },
    { path: 'teachers', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Teacher } },
    { path: 'teachers/:teacherId', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Teacher } },
    { path: 'places', component: WeekScheduleComponent, data: { mode: WeekScheduleMode.Place } },
    { path: 'schedules', component: ScheduleListComponent },
    { path: 'unschedules', component: TaskListComponent },
    { path: 'priorities', component: ObservePriorityListComponent },
    {
        path: 'teacher/:teacherId/week/:week/day/:day/section/:section',
        component: ObservationFormEditorComponent,
        data: { mode: EditMode.Create },
    },
    {
        path: 'teacher/:teacherId/task/:taskId',
        component: ObservationSpecial,
        data: { mode: EditMode.Create },
    },
    { path: ':id/edit', component: ObservationFormEditorComponent, data: { mode: EditMode.Edit } },
    { path: ':id', component: ObservationItemComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true }),
    ],
    exports: [
        RouterModule,
    ],
})
export class ObservationRoutingModule { }
