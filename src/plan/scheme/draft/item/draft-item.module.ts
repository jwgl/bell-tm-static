import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogModule} from '../../../../core/dialogs';
import {WorkflowModule} from '../../../../core/workflow';
import {PlanCommonModule} from '../../../common/module';
import {SchemeViewerComponent} from '../../common/scheme-viewer.component';
import {SchemeDraftItemComponent} from './draft-item.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDialogModule,
        WorkflowModule,
    ],
    declarations: [
        SchemeViewerComponent,
        SchemeDraftItemComponent,
    ],
    exports: [
        SchemeDraftItemComponent,
    ],
})
export class DraftItemModule {}
