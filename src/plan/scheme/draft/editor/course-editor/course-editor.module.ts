import {CommonModule} from '@angular/common';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {PlanSharedModule} from '../../../../shared/module';
import {SchemeSharedModule} from '../../../shared/scheme.module';
import {AllowedTermAccessor} from './allowed-term.accessor';
import {AllowedTermComponent} from './allowed-term.component';
import {CourseEditorDialog} from './course-editor.dialog';
import {CourseEditorService} from './course-editor.service';
import {CourseSelectComponent} from './course-select.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CommonDirectivesModule,
        PlanSharedModule,
        SchemeSharedModule,
    ],
    declarations: [
        CourseEditorDialog,
        CourseSelectComponent,
        AllowedTermComponent,
        AllowedTermAccessor,
    ],
    providers: [
        Dialog,
        CourseEditorService,
    ],
    exports: [
        CourseEditorDialog,
    ],
    entryComponents: [
        CourseEditorDialog,
    ],
})
export class CourseEditorModule {}
