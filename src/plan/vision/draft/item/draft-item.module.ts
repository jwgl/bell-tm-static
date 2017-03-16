import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {WorkflowModule} from 'core/workflow';

import {PlanCommonModule} from '../../../common/module';
import {VisionViewerModule} from '../../common/vision-viewer.module';
import {VisionDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
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
