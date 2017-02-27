import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {FreeListenApprovalItemComponent} from './approval-item.component';
import {FreeListenApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'todo', pathMatch: 'full'},
    {
        path: ':type',
        children: [
            {
                path: '',
                component: FreeListenApprovalListComponent,
                resolve: {list: WorkflowListResolve},

            },
            {
                path: ':id',
                component: FreeListenApprovalItemComponent,
                resolve: {item: WorkflowItemResolve},
            },
            {
                path: ':id/workitems/:wi',
                component: FreeListenApprovalItemComponent,
                resolve: {item: WorkflowItemResolve},
            },
        ],
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
export class FreeListenApprovalRoutingModule {}
