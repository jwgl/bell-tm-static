import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuditStatusComponent} from './components/audit-status';
import {FromNowComponent} from './components/from-now';
import {CheckboxSelectorComponent} from './components/checkbox-selector';
import {PagerComponent} from './components/pager';
import {Markdown} from './directives/markdown';
import {Spinning} from './directives/spinning';
import {FormDirective} from './bootstrap/form.directive';
import {FormFieldComponent} from './bootstrap/form-field.component';
import {FormControlDirective} from './bootstrap/form-control.directive';
import {GroupByPipe} from './pipes/group-by';
import {ZeroPadPipe} from './pipes/zero-pad';
import {
    FromNowPipe,
    MomentFormatPipe,
    DayOfWeekPipe,
} from './pipes/moment-pipes';
import {ActionNamePipe, ActionClassPipe} from './pipes/audit-action';
import {MarkdownPipe} from './pipes/markdown';
import {
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
    ModalBodyDirective,
    ModalFooterDirective,
} from './bootstrap/modal-dialog.directive';

export {
    CheckboxSelectorComponent,
}

const CORE_DIRECTIVES: any[] = [
    // common commponent
    AuditStatusComponent,
    FromNowComponent,
    CheckboxSelectorComponent,
    PagerComponent,
    // bootstrap form directives
    FormDirective,
    FormFieldComponent,
    FormControlDirective,
    // bootstrap modal directives
    ModalDialogDirective,
    ModalCancelButtonDirective,
    ModalOkButtonDirective,
    ModalBodyDirective,
    ModalFooterDirective,
    // other directives
    Markdown,
    Spinning,
    // pipes
    GroupByPipe,
    ZeroPadPipe,
    FromNowPipe,
    MomentFormatPipe,
    DayOfWeekPipe,
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
