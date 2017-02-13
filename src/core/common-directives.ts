import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {FormControlDirective} from './bootstrap/form-control.directive';
import {
    FormField2Component,
    FormFieldLeftDirective,
    FormFieldRightDirective,
} from './bootstrap/form-field-2.component';
import {FormFieldComponent} from './bootstrap/form-field.component';
import {FormDirective} from './bootstrap/form.directive';
import {
    ModalBodyDirective,
    ModalCancelButtonDirective,
    ModalDialogDirective,
    ModalFooterDirective,
    ModalOkButtonDirective,
} from './bootstrap/modal-dialog.directive';
import {AuditStatusComponent} from './components/audit-status';
import {CheckboxSelectorComponent} from './components/checkbox-selector';
import {FormTitleComponent} from './components/form-title';
import {FromNowComponent} from './components/from-now';
import {PagerComponent} from './components/pager';
import {Markdown} from './directives/markdown';
import {Spinning} from './directives/spinning';
import {ActionClassPipe, ActionNamePipe} from './pipes/audit-action';
import {FilterByPipe} from './pipes/filter-by';
import {GroupByPipe} from './pipes/group-by';
import {MarkdownPipe} from './pipes/markdown';
import {
    DayOfWeekPipe,
    FromNowPipe,
    MomentFormatPipe,
} from './pipes/moment-pipes';

import {OddEvenPipe} from './pipes/odd-even';
import {ZeroPadPipe} from './pipes/zero-pad';

export {
    CheckboxSelectorComponent,
}

const CORE_DIRECTIVES: any[] = [
    // common commponent
    AuditStatusComponent,
    FromNowComponent,
    CheckboxSelectorComponent,
    PagerComponent,
    FormTitleComponent,
    // bootstrap form directives
    FormDirective,
    FormControlDirective,
    FormFieldComponent,
    FormField2Component,
    FormFieldLeftDirective,
    FormFieldRightDirective,
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
    FilterByPipe,
    ZeroPadPipe,
    FromNowPipe,
    MomentFormatPipe,
    DayOfWeekPipe,
    ActionNamePipe,
    ActionClassPipe,
    MarkdownPipe,
    OddEvenPipe,
];

@NgModule({
    imports: [CommonModule],
    declarations: [CORE_DIRECTIVES],
    exports: [CORE_DIRECTIVES],
})
export class CommonDirectivesModule {}
