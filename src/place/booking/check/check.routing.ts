import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {WorkflowItemResolve, WorkflowListResolve} from 'core/workflow';

import {BookingCheckItemComponent} from './check-item.component';
import {BookingCheckListComponent} from './check-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {
        path: 'list/:status',
        component: BookingCheckListComponent,
        resolve: {list: WorkflowListResolve},
    },
    {
        path: ':id',
        component: BookingCheckItemComponent,
        resolve: {item: WorkflowItemResolve},
    },
    {
        path: ':id/workitems/:wi',
        component: BookingCheckItemComponent,
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
export class BookingCheckRoutingModule {}
