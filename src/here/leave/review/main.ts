import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {LeaveSharedModule} from '../shared/leave-shared.module';
import {LeaveReviewRoutingModule} from './review.routing';
import {LeaveReviewComponent} from './review.component';
import {LeaveReviewListComponent} from './list/review-list.component';
import {LeaveReviewItemComponent} from './item/review-item.component';
import {LeaveReviewService} from './review.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/reviewers/${userId}/leaves'),
        LeaveSharedModule,
        LeaveReviewRoutingModule,
    ],
    declarations: [
        LeaveReviewComponent,
        LeaveReviewListComponent,
        LeaveReviewItemComponent,
    ],
    providers: [
        LeaveReviewService,
    ],
    bootstrap: [LeaveReviewComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
