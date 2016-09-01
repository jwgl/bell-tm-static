import {NgModule, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDirectivesModule} from './common-directives';
import {Dialog} from './dialogs/dialog';
import {SimpleListSelectDialog} from './dialogs/simple-list-select.dialog';
import {TeacherSelectDialog} from './dialogs/teacher-select.dialog';
import {ErrorMessageDialog} from './dialogs/error-message.dialog';
import {ConfirmDialog} from './dialogs/confirm.dialog';

@Injectable()
export class CommonDialog {
    constructor(private dialog: Dialog) {}

    confirm(title: string, content: string): Promise<void> {
        return this.dialog.open(ConfirmDialog, {title, content});
    }

    error(errors: string[]): Promise<void> {
        return this.dialog.open(ErrorMessageDialog, {errors});
    }

    list(title: string, url: string,
        labelFn: (item: any) => string = null,
        valueFn: (item: any) => string = null): Promise<any> {
        return this.dialog.open(SimpleListSelectDialog, {title, url, labelFn, valueFn});
    }

    teacher(title: string): Promise<{id: string, name: string}> {
        return this.dialog.open(TeacherSelectDialog, {title});
    }
}

const COMMON_DIALOGS: any[] = [
    ConfirmDialog,
    SimpleListSelectDialog,
    TeacherSelectDialog,
    ErrorMessageDialog,
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



