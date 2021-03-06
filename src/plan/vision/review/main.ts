import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {VisionViewerModule} from '../shared/vision-viewer.module';
import {VisionReviewComponent} from './review.component';

@NgModule({
    bootstrap: [VisionReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/reviewers/${userId}/visions'),
        CommonDirectivesModule,
        WorkflowModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionReviewComponent,
    ],
    providers: [
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/schemes'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
