import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ReissueSharedModule} from '../shared/reissue-shared.module';
import {ReissueReviewItemComponent} from './item/review-item.component';
import {ReissueReviewListComponent} from './list/review-list.component';
import {ReissueReviewComponent} from './review.component';
import {ReissueReviewRoutingModule} from './review.routing';
import {ReissueReviewService} from './review.service';

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
