import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueSharedModule} from '../shared/reissue-shared.module';
import {ReissueReviewComponent} from './review.component';
import {ReissueReviewService} from './review.service';
import {ReissueReviewRoutingModule} from './review.routing';
import {ReissueReviewListComponent} from './list/review-list.component';
import {ReissueReviewItemComponent} from './item/review-item.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/card/reviewers/${userId}/reissues'),
        ReissueReviewRoutingModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueReviewComponent,
        ReissueReviewListComponent,
        ReissueReviewItemComponent,
    ],
    providers: [
        ReissueReviewService,
    ],
    bootstrap: [ReissueReviewComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
