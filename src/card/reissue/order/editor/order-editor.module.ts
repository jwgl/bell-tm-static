import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {Dialog} from 'core/dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {ReissueCommonModule} from '../../common/reissue-common.module';
import {ReissueFormSelectDialog} from './form-select.dialog';
import {ReissueOrderEditorComponent} from './order-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ReissueCommonModule,
    ],
    declarations: [
        ReissueOrderEditorComponent,
        ReissueFormSelectDialog,
    ],
    exports: [
        ReissueOrderEditorComponent,
    ],
    providers: [
        Dialog,
    ],
    entryComponents: [
        ReissueFormSelectDialog,
    ],
})
export class ReissueOrderEditorModule {}
