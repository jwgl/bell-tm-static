import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogModule} from '../../../../core/dialogs';
import {PlanCommonModule} from '../../../common/module';
import {VisionDraftEditorComponent} from './draft-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PlanCommonModule,
        CommonDialogModule,
    ],
    declarations: [
        VisionDraftEditorComponent,
    ],
    exports: [
        VisionDraftEditorComponent,
    ],
})
export class DraftEditorModule {}
