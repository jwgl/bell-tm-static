import {NgModule, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {Dialog} from 'core/dialogs';
import {CommonDirectivesModule} from 'core/common-directives';

import {PlanCommonModule} from '../../../../common/module';

import {CourseEditorDialog} from './course-editor.dialog';
import {CourseSelectComponent} from './course-select.component';
import {AllowedTermComponent, AllowedTermAccessor} from './allowed-term.component';

@Injectable()
export class CourseEditorService {
    constructor(private dialog: Dialog) {}

    open(options: any): Promise<any> {
        return this.dialog.open(CourseEditorDialog, options);
    }
}

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
