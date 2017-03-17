import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {WorkflowModule} from 'core/workflow';

import {PlanSharedModule} from '../../../shared/module';
import {VisionViewerModule} from '../../shared/vision-viewer.module';
import {VisionDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanSharedModule,
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
