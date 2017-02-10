import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';
import {CommonDirectivesModule} from 'core/common-directives';

import {FreeListenSharedModule} from '../shared/free-listen-shared.module';
import {FreeListenApprovalComponent} from './approval.component';
import {FreeListenApprovalService} from './approval.service';
import {FreeListenApprovalRoutingModule} from './approval.routing';
import {FreeListenApprovalListComponent} from './list/approval-list.component';
import {FreeListenApprovalItemComponent} from './item/approval-item.component';

@NgModule({
    imports: [
        BrowserModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/here/approvers/${userId}/freeListens'),
        FreeListenApprovalRoutingModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeListenApprovalComponent,
        FreeListenApprovalListComponent,
        FreeListenApprovalItemComponent,
    ],
    providers: [
        FreeListenApprovalService,
    ],
    bootstrap: [FreeListenApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
