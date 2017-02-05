import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LeaveApprovalListComponent} from './list/approval-list.component';
import {LeaveApprovalItemComponent} from './item/approval-item.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/SUBMITTED', pathMatch: 'full'},
    {path: 'list/:status', component: LeaveApprovalListComponent},
    {path: ':id', component: LeaveApprovalItemComponent},
    {path: ':id/workitems/:wi', component: LeaveApprovalItemComponent},
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
