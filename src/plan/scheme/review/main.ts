import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {SchemeReviewComponent} from './review.component';
import {SchemeInternalViewerModule} from '../common/internal-viewer/scheme-viewer.module';

@NgModule({
    bootstrap: [SchemeReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/plan/schemes'),
        WorkflowModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
