import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ApplicationSharedModule} from '../shared/application-shared.module';
import {ApplicationApprovalComponent} from './approval.component';
import {ApplicationApprovalRoutingModule} from './approval.routing';

import {ApplicationApprovalItemComponent} from './approval-item.component';
import {ApplicationApprovalListComponent} from './approval-list.component';
import {MentorSelectDialog} from './mentor/mentor-select.dialog';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/dualdegree/checkers/${userId}/applications'),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
    ],
    declarations: [
        ApplicationApprovalComponent,
        ApplicationApprovalListComponent,
        ApplicationApprovalItemComponent,
        MentorSelectDialog,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        MentorSelectDialog,
    ],
    bootstrap: [ApplicationApprovalComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
