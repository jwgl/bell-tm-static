import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';

import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueFormEditorComponent} from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
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
