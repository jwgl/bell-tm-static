import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {BookingApprovalItemComponent} from './approval-item.component';
import {BookingApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {
        path: 'list/:status',
        component: BookingApprovalListComponent,
        resolve: {list: WorkflowListResolve},
    },
    {
        path: ':id',
        component: BookingApprovalItemComponent,
        resolve: {item: WorkflowItemResolve},
    },
    {
        path: ':id/workitems/:wi',
        component: BookingApprovalItemComponent,
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
export class BookingApprovalRoutingModule {}
