import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {Dialog} from 'core/dialogs';
import {WorkflowModule} from 'core/workflow';

import {ApplicationSharedModule} from '../../shared/application-shared.module';
import {PaperFormModule} from '../paper/paper.module';
import {ApplicationItemComponent} from './item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        WorkflowModule,
        ApplicationSharedModule,
        PaperFormModule,
    ],
    declarations: [
        ApplicationItemComponent,
    ],
    exports: [
        ApplicationItemComponent,
    ],
    providers: [
        Dialog,
    ],
})
export class ApplicationFormItemModule {}
