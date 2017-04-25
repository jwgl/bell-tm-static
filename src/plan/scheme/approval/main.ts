import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {PlanSharedModule} from '../../shared/module';
import {SchemeInternalViewerModule} from '../shared/internal-viewer/scheme-viewer.module';
import {SchemeSharedModule} from '../shared/scheme.module';
import {SchemeApprovalComponent} from './approval.component';
import {SchemeApprovalRoutingModule} from './approval.routing';

import {SchemeApprovalItemComponent} from './approval-item.component';
import {SchemeApprovalListComponent} from './approval-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/plan/approvers/${userId}/schemes'),
        SchemeApprovalRoutingModule,
        PlanSharedModule,
        SchemeInternalViewerModule,
        SchemeSharedModule,
    ],
    declarations: [
        SchemeApprovalComponent,
        SchemeApprovalListComponent,
        SchemeApprovalItemComponent,
    ],
    bootstrap: [SchemeApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
