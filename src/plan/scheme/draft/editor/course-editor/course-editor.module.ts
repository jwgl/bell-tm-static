import {NgModule, Injectable, Inject, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Dialog, provideDialog} from '../../../../../core/dialogs';
import {ModalDirectivesModule} from '../../../../../core/directives';
import {BootstrapFormModule} from '../../../../../core/bootstrap';
import {PlanCommonModule} from '../../../../common/module';

import {CourseEditorDialog} from './course-editor.dialog';

const COURSE_EDITOR_DIALOG = new OpaqueToken('Course editor dialog');

@Injectable()
export class CourseEditorService {
    constructor(@Inject(COURSE_EDITOR_DIALOG) private dialog: Dialog) {}

    open(options: any): Promise<any> {
        return this.dialog.open(CourseEditorDialog, options);
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ModalDirectivesModule,
        BootstrapFormModule,
        PlanCommonModule,
    ],
    declarations: [
        CourseEditorDialog,
    ],
    providers: [
        provideDialog(COURSE_EDITOR_DIALOG, CourseEditorModule),
        CourseEditorService,
    ],
    exports: [
        CourseEditorDialog,
    ],
})
export class CourseEditorModule {}
