import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditStatusComponent} from './components/audit-status';
import {FromNowComponent} from './components/from-now';
import {Markdown} from './directives/markdown';
import {Spinning} from './directives/spinning';
import {FormDirective} from './bootstrap/form.directive';
import {FormGroupDirective} from './bootstrap/form-group.directive';
import {FormFieldComponent} from './bootstrap/form-field.component';
import {FormControlDirective} from './bootstrap/form-control.directive';
import {GroupByPipe} from './pipes/group-by';
import {FromNowPipe, MomentFormatPipe} from './pipes/moment-pipes';
import {ActionNamePipe, ActionClassPipe} from './pipes/audit-action';
import {MarkdownPipe} from './pipes/markdown';
import {
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
} from './directives/modal-dialog.directive';

const CORE_DIRECTIVES: any[] = [
    // common commponent
    AuditStatusComponent,
    FromNowComponent,
    // bootstrap form directives
    FormDirective,
    FormGroupDirective,
    FormFieldComponent,
    FormControlDirective,
    // bootstrap modal directives
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
    // other directives
    Markdown,
    Spinning,
    // pipes
    GroupByPipe,
    FromNowPipe,
    MomentFormatPipe,
    ActionNamePipe,
    ActionClassPipe,
    MarkdownPipe,
];

@NgModule({
    imports: [CommonModule],
    declarations: [CORE_DIRECTIVES],
    exports: [CORE_DIRECTIVES],
})
export class CommonDirectivesModule {}
