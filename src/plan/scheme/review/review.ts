import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from '../../../core/http';
import {WorkflowModule} from '../../../core/workflow';
import {PlanCommonModule} from '../../common/module';
import {SchemeReviewComponent} from './review.component';
import {SchemeViewerComponent} from '../common/scheme-viewer.component';
import {SchemeReviewService} from './review.service';

@NgModule({
    bootstrap: [SchemeReviewComponent],
    declarations: [
        SchemeReviewComponent,
        SchemeViewerComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/schemes'),
        PlanCommonModule,
        WorkflowModule,
    ],
    providers: [
        SchemeReviewService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
