import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from '../../../../core/common-dialogs';
import {PlanCommonModule} from '../../../common/module';
import {VisionDraftEditorComponent} from './draft-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PlanCommonModule,
        CommonDialogsModule,
    ],
    declarations: [
        VisionDraftEditorComponent,
    ],
    exports: [
        VisionDraftEditorComponent,
    ],
})
export class VisionDraftEditorModule {}
