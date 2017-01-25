import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {LeaveSharedModule} from '../../shared/leave-shared.module';
import {LeaveFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        LeaveSharedModule,
    ],
    declarations: [
        LeaveFormItemComponent,
    ],
    exports: [
        LeaveFormItemComponent,
    ],
})
export class LeaveFormItemModule {}
