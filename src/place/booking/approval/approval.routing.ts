import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BookingApprovalItemComponent} from './item/approval-item.component';
import {BookingApprovalListComponent} from './list/approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {path: 'list/:status', component: BookingApprovalListComponent},
    {path: ':id', component: BookingApprovalItemComponent},
    {path: ':id/workitems/:wi', component: BookingApprovalItemComponent},
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
