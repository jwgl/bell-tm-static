import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {FreeListenCheckItemComponent} from './check-item.component';
import {FreeListenCheckListComponent} from './check-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {
        path: 'list/:status',
        component: FreeListenCheckListComponent,
        resolve: {list: WorkflowListResolve},
    },
    {
        path: ':id',
        component: FreeListenCheckItemComponent,
        resolve: {item: WorkflowItemResolve},
    },
    {
        path: ':id/workitems/:wi',
        component: FreeListenCheckItemComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class FreeListenCheckRoutingModule {}
