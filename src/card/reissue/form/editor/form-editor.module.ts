import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogModule} from '../../../../core/dialogs';
import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueFormEditorComponent} from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueFormEditorComponent,
    ],
    exports: [
        ReissueFormEditorComponent,
    ],
})
export class ReissueFormEditorModule {}
