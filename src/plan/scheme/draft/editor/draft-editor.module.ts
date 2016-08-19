import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CommonDialogModule} from '../../../../core/dialogs';
import {PlanCommonModule} from '../../../common/module';
import {CourseEditorModule} from './course-editor/course-editor.module';

import {SchemeDraftEditorComponent} from './draft-editor.component';
import {SchemeDraftTableComponent} from './scheme-table.component';
import {SchemePropertyComponent} from './scheme-property.component';
import {SchemeGroupComponent} from './scheme-group.component';
import {SchemeCourseComponent} from './scheme-course.component';
import {SchemeSummaryComponent} from './scheme-summary.component';

@NgModule({
    imports: [
        CommonModule,
        PlanCommonModule,
        CommonDialogModule,
        CourseEditorModule,
    ],
    declarations: [
        SchemeDraftEditorComponent,
        SchemeDraftTableComponent,
        SchemePropertyComponent,
        SchemeGroupComponent,
        SchemeCourseComponent,
        SchemeSummaryComponent,
    ],
    exports: [
        SchemeDraftEditorComponent,
    ],
})
export class DraftEditorModule {}
