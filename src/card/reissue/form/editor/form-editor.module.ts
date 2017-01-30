import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';

import {ReissueSharedModule} from '../../shared/reissue-shared.module';
import {ReissueFormEditorComponent} from './form-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        ReissueSharedModule,
    ],
    declarations: [
        ReissueFormEditorComponent,
    ],
    exports: [
        ReissueFormEditorComponent,
    ],
})
export class ReissueFormEditorModule {}
