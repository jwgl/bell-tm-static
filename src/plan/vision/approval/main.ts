import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {PlanSharedModule} from '../../shared/module';
import {VisionViewerModule} from '../shared/vision-viewer.module';
import {VisionApprovalComponent} from './approval.component';
import {VisionApprovalRoutingModule} from './approval.routing';

import {VisionApprovalItemComponent} from './approval-item.component';
import {VisionApprovalListComponent} from './approval-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/plan/approvers/${userId}/visions'),
        VisionApprovalRoutingModule,
        PlanSharedModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionApprovalComponent,
        VisionApprovalListComponent,
        VisionApprovalItemComponent,
    ],
    providers: [
        {provide: 'PUBLIC_SCHEMES_WEB_URL', useValue: '/web/plan/schemes'},
    ],
    bootstrap: [VisionApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
