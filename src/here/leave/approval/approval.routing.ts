import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {LeaveApprovalItemComponent} from './approval-item.component';
import {LeaveApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/SUBMITTED', pathMatch: 'full'},
    {
        path: 'list/:status',
        component: LeaveApprovalListComponent,
        resolve: {list: WorkflowListResolve},
    },
    {
        path: ':id',
        component: LeaveApprovalItemComponent,
        resolve: {item: WorkflowItemResolve},
    },
    {
        path: ':id/workitems/:wi',
        component: LeaveApprovalItemComponent,
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
export class LeaveApprovalRoutingModule {}
