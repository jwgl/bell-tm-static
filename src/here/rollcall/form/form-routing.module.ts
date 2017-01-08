import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';
import {RollcallScheduleComponent} from './schedule/schedule.component';
import {RollcallFormEditorComponent} from './editor/form-editor.component';

const routes: Routes = [
    {path: '', redirectTo: 'schedules', pathMatch: 'full'},
    {path: 'schedules', component: RollcallScheduleComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class RollcallFormRoutingModule {}
