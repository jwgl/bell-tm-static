import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {FreeSharedModule} from '../../shared/free-shared.module';
import {FreeFormItemComponent} from './form-item.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDialogsModule,
        WorkflowModule,
        FreeSharedModule,
    ],
    declarations: [
        FreeFormItemComponent,
    ],
    exports: [
        FreeFormItemComponent,
    ],
})
export class FreeFormItemModule {}
