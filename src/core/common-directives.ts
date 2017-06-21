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
import {ExpendComponent} from './components/expend';
import {FormTitleComponent} from './components/form-title';
import {FromNowComponent} from './components/from-now';
import {PagerComponent} from './components/pager';
import {RemoveItemComponent} from './components/remove-item';
import {Markdown} from './directives/markdown';
import {Spinning} from './directives/spinning';
import {ActionClassPipe, ActionNamePipe} from './pipes/audit-action';
import {AuditStatusTextPipe} from './pipes/audit-status';
import {DayOfWeekPipe} from './pipes/day-of-week';
import {FilterByPipe} from './pipes/filter-by';
import {GroupByPipe} from './pipes/group-by';
import {MarkdownPipe} from './pipes/markdown';
import {FromNowPipe} from './pipes/moment-pipes';
import {SectionRangePipe} from './pipes/section-range';

import {OddEvenPipe} from './pipes/odd-even';
import {ZeroPadPipe} from './pipes/zero-pad';

import {ScheduleTimetableComponent} from './components/schedule-timetable/schedule-timetable.component';
import {ScheduleWeektabComponent} from './components/schedule-timetable/schedule-weektab.component';

export {
    CheckboxSelectorComponent,
};

const CORE_DIRECTIVES: any[] = [
    // common commponent
    AuditStatusComponent,
    CheckboxSelectorComponent,
    ExpendComponent,
    FormTitleComponent,
    FromNowComponent,
    PagerComponent,
    RemoveItemComponent,
    ScheduleTimetableComponent,
    ScheduleWeektabComponent,
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
    DayOfWeekPipe,
    ActionNamePipe,
    ActionClassPipe,
    MarkdownPipe,
    OddEvenPipe,
    SectionRangePipe,
    AuditStatusTextPipe,
];

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        CORE_DIRECTIVES,
    ],
    exports: [
        CORE_DIRECTIVES,
    ],
})
export class CommonDirectivesModule {}
