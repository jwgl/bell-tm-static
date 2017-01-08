import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallDetailViewComponent} from './detail-view.component';
import {RollcallListViewComponent} from './list-view.component';

const routes: Routes = [
    {
        path: 'week/:week/day/:day/section/:section',
        component: RollcallFormEditorComponent,
        children: [
            {path: '', redirectTo: 'detail', pathMatch: 'full'},
            {path: 'detail', component: RollcallDetailViewComponent},
            {path: 'list', component: RollcallListViewComponent},
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RollcallFormRoutingModule {}