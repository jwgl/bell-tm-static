import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {SchemeReviewComponent} from './review.component';
import {SchemeViewerModule} from '../common/scheme-viewer.module';

@NgModule({
    bootstrap: [SchemeReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/schemes'),
        WorkflowModule,
        SchemeViewerModule,
    ],
    declarations: [
        SchemeReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
