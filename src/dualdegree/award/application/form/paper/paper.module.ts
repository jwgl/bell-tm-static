import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {UploaderModule} from '../../../../shared/uploader/uploader.module';
import {PaperFormDialog} from './paper-form.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDialogsModule,
        CommonDirectivesModule,
        UploaderModule,
    ],
    declarations: [
        PaperFormDialog,
    ],
    entryComponents: [
        PaperFormDialog,
    ],
    exports: [
        PaperFormDialog,
    ],
})
export class PaperFormModule {}
