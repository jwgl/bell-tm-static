import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogModule} from '../../../../core/dialogs';
import {WorkflowModule} from '../../../../core/workflow';
import {PlanCommonModule} from '../../../common/module';
import {VisionViewerComponent} from '../../common/vision-viewer.component';
import {VisionDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDialogModule,
        WorkflowModule,
    ],
    declarations: [
        VisionViewerComponent,
        VisionDraftItemComponent,
    ],
    exports: [
        VisionDraftItemComponent,
    ],
})
export class DraftItemModule {}
