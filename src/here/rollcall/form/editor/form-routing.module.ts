import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallDetailViewComponent} from './detail-view.component';
import {RollcallListViewComponent} from './list-view.component';
import {RollcallTileViewComponent} from './tile-view.component';
import {RollcallLockViewComponent} from './lock-view.component';
import {RollcallFormEditorResolve} from './form-editor-resolve.service';
import {RollcallFormResolve} from '../form-resolve.service';

const routes: Routes = [
    {
        path: 'week/:week/day/:day/section/:section',
        component: RollcallFormEditorComponent,
        resolve: {
            list: RollcallFormResolve,
            form: RollcallFormEditorResolve,
        },
        children: [
            {path: 'detail', component: RollcallDetailViewComponent},
            {path: 'list', component: RollcallListViewComponent},
            {path: 'tile', component: RollcallTileViewComponent},
            {path: 'lock', component: RollcallLockViewComponent},
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        RollcallFormEditorResolve,
    ],
})
export class RollcallFormRoutingModule {}
