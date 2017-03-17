import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';

import {PlanSharedModule} from '../../../shared/module';
import {VisionDraftEditorComponent} from './draft-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PlanSharedModule,
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
