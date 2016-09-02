import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueFormItemComponent,
    ],
    exports: [
        ReissueFormItemComponent,
    ],
})
export class ReissueFormItemModule {}
