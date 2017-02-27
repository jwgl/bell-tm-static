import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {BookingApprovalItemComponent} from './approval-item.component';
import {BookingApprovalListComponent} from './approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'todo', pathMatch: 'full'},
    {
        path: ':type',
        children: [
            {
                path: '',
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
export class BookingApprovalRoutingModule {}
