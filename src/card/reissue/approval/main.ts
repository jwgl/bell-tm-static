import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ReissueSharedModule} from '../shared/reissue-shared.module';
import {ReissueApprovalItemComponent} from './approval-item.component';
import {ReissueApprovalListComponent} from './approval-list.component';
import {ReissueApprovalComponent} from './approval.component';
import {ReissueApprovalRoutingModule} from './approval.routing';
import {ReissueApprovalService} from './approval.service';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/card/approvers/${userId}/reissues'),
        ReissueApprovalRoutingModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueApprovalComponent,
        ReissueApprovalListComponent,
        ReissueApprovalItemComponent,
    ],
    providers: [
        ReissueApprovalService,
    ],
    bootstrap: [ReissueApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
