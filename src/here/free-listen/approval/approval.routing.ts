import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FreeListenApprovalItemComponent} from './item/approval-item.component';
import {FreeListenApprovalListComponent} from './list/approval-list.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/PENDING', pathMatch: 'full'},
    {path: 'list/:status', component: FreeListenApprovalListComponent},
    {path: ':id', component: FreeListenApprovalItemComponent},
    {path: ':id/workitems/:wi', component: FreeListenApprovalItemComponent},
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
