import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {LeaveSharedModule} from '../shared/leave-shared.module';
import {LeaveApprovalRoutingModule} from './approval.routing';
import {LeaveApprovalComponent} from './approval.component';
import {LeaveApprovalListComponent} from './list/approval-list.component';
import {LeaveApprovalItemComponent} from './item/approval-item.component';
import {LeaveApprovalService} from './approval.service';

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
