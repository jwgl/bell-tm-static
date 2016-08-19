import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from '../../../core/http';
import {WorkflowModule} from '../../../core/workflow';
import {PlanCommonModule} from '../../common/module';
import {VisionViewerComponent} from '../common/vision-viewer.component';
import {VisionReviewComponent} from './review.component';
import {VisionReviewService} from './review.service';

@NgModule({
    bootstrap: [VisionReviewComponent],
    declarations: [
        VisionReviewComponent,
        VisionViewerComponent,
    ],
    imports: [
        BrowserModule,
        RestModule.for('/api/visions'),
        PlanCommonModule,
        WorkflowModule,
    ],
    providers: [
        VisionReviewService,
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
