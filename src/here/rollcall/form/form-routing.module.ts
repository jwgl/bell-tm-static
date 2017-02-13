import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';
import {RollcallFormEditorComponent} from './editor/form-editor.component';
import {RollcallFormResolve} from './form-resolve.service';
import {RollcallScheduleComponent} from './schedule/schedule.component';

const routes: Routes = [
    {path: '', redirectTo: 'schedules', pathMatch: 'full'},
    {
        path: 'schedules',
        component: RollcallScheduleComponent,
        resolve: {
            list: RollcallFormResolve,
        },
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        RollcallFormResolve,
    ],
})
export class RollcallFormRoutingModule {}
