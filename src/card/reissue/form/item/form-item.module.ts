import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {ReissueSharedModule} from '../../shared/reissue-shared.module';
import {ReissueFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueFormItemComponent,
    ],
    exports: [
        ReissueFormItemComponent,
    ],
})
export class ReissueFormItemModule {}
