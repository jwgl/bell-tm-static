import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {FreeListenSharedModule} from '../shared/free-listen-shared.module';
import {FreeListenApprovalComponent} from './approval.component';
import {FreeListenApprovalRoutingModule} from './approval.routing';

import {FreeListenApprovalItemComponent} from './approval-item.component';
import {FreeListenApprovalListComponent} from './approval-list.component';

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
    bootstrap: [FreeListenApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
