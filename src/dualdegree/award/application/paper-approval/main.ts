import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {UploaderModule} from '../../../shared/uploader/uploader.module';
import {ApplicationSharedModule} from '../shared/application-shared.module';
import {PaperApprovalComponent} from './approval.component';
import {ApplicationApprovalRoutingModule} from './approval.routing';

import {PaperApprovalItemComponent} from './approval-item.component';
import {PaperApprovalListComponent} from './approval-list.component';
import {PaperApprovalService} from './approval.service';
import {UploaderDialog} from './uploader.dialog';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/dualdegree/mentors/${userId}/papers'),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
        UploaderModule,
    ],
    declarations: [
        PaperApprovalComponent,
        PaperApprovalListComponent,
        PaperApprovalItemComponent,
        UploaderDialog,
    ],
    providers: [
        Dialog,
        PaperApprovalService,
    ],
    entryComponents: [
        UploaderDialog,
    ],
    bootstrap: [PaperApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
