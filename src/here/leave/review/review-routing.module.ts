import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {LeaveReviewListComponent} from './list/review-list.component';
import {LeaveReviewItemComponent} from './item/review-item.component';

const routes = [
    {path: '', redirectTo: 'list/SUBMITTED', pathMatch: 'full'},
    {path: 'list/:status', component: LeaveReviewListComponent},
    {path: ':id', component: LeaveReviewItemComponent},
    {path: ':id/workitems/:wi', component: LeaveReviewItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class LeaveReviewRoutingModule {}
