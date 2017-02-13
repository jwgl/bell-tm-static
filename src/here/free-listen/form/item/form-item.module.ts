import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {FreeListenSharedModule} from '../../shared/free-listen-shared.module';
import {FreeFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        FreeListenSharedModule,
    ],
    declarations: [
        FreeFormItemComponent,
    ],
    exports: [
        FreeFormItemComponent,
    ],
})
export class FreeListenFormItemModule {}
