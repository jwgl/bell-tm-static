import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDirectivesModule} from 'core/common-directives';
import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {PlanCommonModule} from '../../../common/module';
import {VisionViewerModule} from '../../common/vision-viewer.module';
import {VisionDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDirectivesModule,
        CommonDialogsModule,
        WorkflowModule,
        VisionViewerModule,
    ],
    declarations: [
        VisionDraftItemComponent,
    ],
    exports: [
        VisionDraftItemComponent,
    ],
})
export class VisionDraftItemModule {}
