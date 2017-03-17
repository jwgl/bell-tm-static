import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {SchemeInternalViewerModule} from '../shared/internal-viewer/scheme-viewer.module';
import {SchemeReviewComponent} from './review.component';

@NgModule({
    bootstrap: [SchemeReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/reviewers/${userId}/schemes'),
        WorkflowModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
