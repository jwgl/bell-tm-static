import {NgModule, Injectable, Inject, ApplicationRef, Compiler, Type, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ModalDirectivesModule} from './directives';
import {BootstrapFormModule} from './bootstrap';
import {Dialog, BaseDialog} from './dialogs/dialog';

import {SimpleListSelectDialog} from './dialogs/simple-list-select.dialog';
import {TeacherSelectDialog} from './dialogs/teacher-select.dialog';
import {ErrorMessageDialog} from './dialogs/error-message.dialog';
import {ConfirmDialog} from './dialogs/confirm.dialog';

export {Dialog, BaseDialog}

export function provideDialog(token: OpaqueToken, ngModule: Type) {
    return {
        provide: token ? token : Dialog,
        useFactory: (app: ApplicationRef, compiler: Compiler) => {
            let dialog = new Dialog(app, compiler);
            dialog.ngModule = ngModule;
            return dialog;
        },
        deps: [
            ApplicationRef,
            Compiler,
        ],
    };
}

const COMMON_DIALOG = new OpaqueToken('Common Dialog');

@Injectable()
export class CommonDialog {
    constructor(@Inject(COMMON_DIALOG)private dialog: Dialog) {}

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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalDirectivesModule,
        BootstrapFormModule,
    ],
    declarations: [
        ConfirmDialog,
        SimpleListSelectDialog,
        TeacherSelectDialog,
        ErrorMessageDialog,
    ],
    providers: [
        provideDialog(COMMON_DIALOG, CommonDialogModule),
        CommonDialog,
    ],
    exports: [
        ConfirmDialog,
        SimpleListSelectDialog,
        TeacherSelectDialog,
        ErrorMessageDialog,
    ],
})
export class CommonDialogModule {}



