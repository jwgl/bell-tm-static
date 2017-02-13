import {Injectable} from '@angular/core';

import {ConfirmDialog} from './confirm.dialog';
import {Dialog} from './dialog';
import {ErrorMessageDialog} from './error-message.dialog';
import {SimpleListSelectDialog} from './simple-list-select.dialog';
import {TeacherSelectDialog} from './teacher-select.dialog';

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
