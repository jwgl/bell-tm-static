import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {ReissueApprovalItemComponent} from './approval-item.component';
import {ReissueApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'todo', pathMatch: 'full'},
    {
        path: ':type',
        children: [
            {
                path: '',
                component: ReissueApprovalListComponent,
                resolve: {list: WorkflowListResolve},

            },
            {
                path: ':id',
                component: ReissueApprovalItemComponent,
                resolve: {item: WorkflowItemResolve},
            },
            {
                path: ':id/workitems/:wi',
                component: ReissueApprovalItemComponent,
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
export class ReissueApprovalRoutingModule {}
