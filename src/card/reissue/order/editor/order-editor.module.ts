import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {ReissueSharedModule} from '../../shared/reissue-shared.module';
import {ReissueFormSelectDialog} from './form-select.dialog';
import {ReissueOrderEditorComponent} from './order-editor.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
        ReissueSharedModule,
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
