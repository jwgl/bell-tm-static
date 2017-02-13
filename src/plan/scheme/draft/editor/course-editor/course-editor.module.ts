import {CommonModule} from '@angular/common';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonDirectivesModule} from 'core/common-directives';
import {Dialog} from 'core/dialogs';

import {PlanCommonModule} from '../../../../common/module';
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
        PlanCommonModule,
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
