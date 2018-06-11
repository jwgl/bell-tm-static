import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';
import {RestModule} from 'core/rest';
import {WorkflowModule} from 'core/workflow';

import {ApplicationSharedModule} from '../shared/application-shared.module';
import {PaperMentorComponent} from './paper-mentor.component';
import {ApplicationApprovalRoutingModule} from './paper-mentor.routing';

import {PaperMentorItemComponent} from './item.component';
import {PaperMentorListComponent} from './list.component';
import {MentorSelectDialog} from './mentor/mentor-select.dialog';
import {PaperMentorService} from './paper-mentor.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        WorkflowModule,
        RestModule.for('/api/dualdegree/checkers/${userId}/papermentors'),
        ApplicationSharedModule,
        ApplicationApprovalRoutingModule,
    ],
    declarations: [
        PaperMentorComponent,
        PaperMentorListComponent,
        PaperMentorItemComponent,
        MentorSelectDialog,
    ],
    providers: [
        Dialog,
        PaperMentorService,
    ],
    entryComponents: [
        MentorSelectDialog,
    ],
    bootstrap: [PaperMentorComponent],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
