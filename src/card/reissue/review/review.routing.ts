import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ReissueReviewListComponent} from './list/review-list.component';
import {ReissueReviewItemComponent} from './item/review-item.component';

const routes: Routes = [
    {path: '', redirectTo: 'list/SUBMITTED', pathMatch: 'full'},
    {path: 'list/:status', component: ReissueReviewListComponent},
    {path: ':id', component: ReissueReviewItemComponent},
    {path: ':id/workitems/:wi', component: ReissueReviewItemComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        RouterModule,
    ],
})
export class ReissueReviewRoutingModule {}
