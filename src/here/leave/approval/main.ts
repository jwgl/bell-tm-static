import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {LeaveSharedModule} from '../shared/leave-shared.module';
import {LeaveApprovalComponent} from './approval.component';
import {LeaveApprovalRoutingModule} from './approval.routing';
import {LeaveApprovalService} from './approval.service';
import {LeaveApprovalItemComponent} from './item/approval-item.component';
import {LeaveApprovalListComponent} from './list/approval-list.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/approvers/${userId}/leaves'),
        LeaveSharedModule,
        LeaveApprovalRoutingModule,
    ],
    declarations: [
        LeaveApprovalComponent,
        LeaveApprovalListComponent,
        LeaveApprovalItemComponent,
    ],
    providers: [
        LeaveApprovalService,
    ],
    bootstrap: [LeaveApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
