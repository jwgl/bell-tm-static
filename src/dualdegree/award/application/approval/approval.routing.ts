import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {ApplicationApprovalItemComponent} from './approval-item.component';
import {ApplicationApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'todo', pathMatch: 'full'},
    {
        path: ':type',
        children: [
            {
                path: '',
                component: ApplicationApprovalListComponent,
                resolve: {list: WorkflowListResolve},

            },
            {
                path: ':id',
                component: ApplicationApprovalItemComponent,
                resolve: {item: WorkflowItemResolve},
            },
            {
                path: ':id/workitems/:wi',
                component: ApplicationApprovalItemComponent,
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
export class ApplicationApprovalRoutingModule {}
