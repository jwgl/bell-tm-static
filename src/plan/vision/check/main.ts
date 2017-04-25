import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {PlanSharedModule} from '../../shared/module';
import {VisionViewerModule} from '../shared/vision-viewer.module';
import {VisionCheckComponent} from './check.component';
import {VisionCheckRoutingModule} from './check.routing';

import {VisionCheckItemComponent} from './check-item.component';
import {VisionCheckListComponent} from './check-list.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/plan/checkers/${userId}/visions'),
        VisionCheckRoutingModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionCheckComponent,
        VisionCheckListComponent,
        VisionCheckItemComponent,
    ],
    providers: [
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/public/schemes'},
    ],
    bootstrap: [VisionCheckComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
