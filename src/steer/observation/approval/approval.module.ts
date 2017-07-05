import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonDialogsModule } from 'core/common-dialogs';
import { CommonDirectivesModule } from 'core/common-directives';
import { RestModule } from 'core/rest';

import { ObservationFormViewerComponent } from '../form/shared/form-viewer.component';
import { EvaluationTextPipe } from '../shared/pipes/evaluation';
import { TypeTextPipe } from '../shared/pipes/observer-type';
import { StatusTextPipe } from '../shared/pipes/status';
import { TermTextPipe } from '../shared/pipes/term';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';
import { ApprovalService } from './approval.service';
import {NavTabsComponent} from './common/nav-tabs.component';
import { ApprovalItemComponent } from './item/approval-item.component';
import { ApprovalListComponent } from './list/approval-list.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RestModule.for('/api/steer/approvers/${userId}/observations'),
        ApprovalRoutingModule,
        CommonDirectivesModule,
        CommonDialogsModule,
    ],
    declarations: [
        ApprovalListComponent,
        ApprovalComponent,
        TermTextPipe,
        EvaluationTextPipe,
        StatusTextPipe,
        ObservationFormViewerComponent,
        ApprovalItemComponent,
        NavTabsComponent,
        TypeTextPipe,
    ],
    providers: [
        ApprovalService,
    ],
    bootstrap: [
        ApprovalComponent,
    ],
})
export class ApprovalModule { }
