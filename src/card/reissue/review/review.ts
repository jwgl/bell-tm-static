import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ReissueCommonModule} from '../common/reissue-common.module';
import {ReissueReviewComponent} from './review.component';

@NgModule({
    bootstrap: [ReissueReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/cardReissues'),
        CommonDirectivesModule,
        WorkflowModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
