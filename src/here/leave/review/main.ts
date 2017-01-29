import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {LeaveSharedModule} from '../shared/leave-shared.module';
import {LeaveReviewRoutingModule} from './review-routing.module';
import {LeaveReviewComponent} from './review.component';
import {LeaveReviewListComponent} from './list/review-list.component';
import {LeaveReviewItemComponent} from './item/review-item.component';
import {LeaveReviewService} from './review.service';

@NgModule({
    bootstrap: [LeaveReviewComponent],
    declarations: [
        LeaveReviewComponent,
        LeaveReviewListComponent,
        LeaveReviewItemComponent,
    ],
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/reviewers/${userId}/leaves'),
        LeaveSharedModule,
        LeaveReviewRoutingModule,
    ],
    providers: [
        LeaveReviewService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
