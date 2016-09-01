import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {CommonDirectivesModule} from '../../../core/common-directives';
import {RestModule} from '../../../core/http';
import {WorkflowModule} from '../../../core/workflow';
import {VisionViewerModule} from '../common/vision-viewer.module';
import {VisionReviewComponent} from './review.component';

@NgModule({
    bootstrap: [VisionReviewComponent],
    imports: [
        BrowserModule,
        RestModule.for('/api/visions'),
        CommonDirectivesModule,
        WorkflowModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionReviewComponent,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
