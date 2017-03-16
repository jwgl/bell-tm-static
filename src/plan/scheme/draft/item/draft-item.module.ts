import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {CommonDialogsModule} from 'core/common-dialogs';
import {WorkflowModule} from 'core/workflow';

import {PlanCommonModule} from '../../../common/module';
import {SchemeInternalViewerModule} from '../../common/internal-viewer/scheme-viewer.module';
import {SchemeDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        PlanCommonModule,
        CommonDialogsModule,
        WorkflowModule,
        SchemeInternalViewerModule,
    ],
    declarations: [
        SchemeDraftItemComponent,
    ],
    exports: [
        SchemeDraftItemComponent,
    ],
})
export class SchemeDraftItemModule {}
