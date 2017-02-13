import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditMode} from 'core/constants';

import {RollcallFormResolve} from '../form-resolve.service';
import {RollcallDetailViewComponent} from './detail-view.component';
import {RollcallFormEditorResolve} from './form-editor-resolve.service';
import {RollcallFormEditorComponent} from './form-editor.component';
import {RollcallListViewComponent} from './list-view.component';
import {RollcallLockGuard} from './lock-guard.service';
import {RollcallLockViewComponent} from './lock-view.component';
import {RollcallTileViewComponent} from './tile-view.component';

const routes: Routes = [
    {
        path: 'week/:week/day/:day/section/:section',
        component: RollcallFormEditorComponent,
        resolve: {
            list: RollcallFormResolve,
            form: RollcallFormEditorResolve,
        },
        children: [
            {path: 'detail', component: RollcallDetailViewComponent, canActivate: [RollcallLockGuard]},
            {path: 'list', component: RollcallListViewComponent, canActivate: [RollcallLockGuard]},
            {path: 'tile', component: RollcallTileViewComponent, canActivate: [RollcallLockGuard]},
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
        RollcallLockGuard,
    ],
})
export class RollcallFormRoutingModule {}
