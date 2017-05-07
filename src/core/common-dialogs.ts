import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from './common-directives';
import {CommonDialog} from './dialogs/common-dialog.service';
import {ConfirmDialog} from './dialogs/confirm.dialog';
import {Dialog} from './dialogs/dialog';
import {ErrorMessageDialog} from './dialogs/error-message.dialog';
import {FormNoticeDialog} from './dialogs/form-notice.dialog';
import {SimpleListSelectDialog} from './dialogs/simple-list-select.dialog';
import {TeacherSelectDialog} from './dialogs/teacher-select.dialog';

export {
    CommonDialog,
};

const COMMON_DIALOGS: any[] = [
    ConfirmDialog,
    ErrorMessageDialog,
    FormNoticeDialog,
    SimpleListSelectDialog,
    TeacherSelectDialog,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        COMMON_DIALOGS,
    ],
    providers: [
        Dialog,
        CommonDialog,
    ],
    exports: [
        COMMON_DIALOGS,
    ],
    entryComponents: [
        COMMON_DIALOGS,
    ],
})
export class CommonDialogsModule {}
