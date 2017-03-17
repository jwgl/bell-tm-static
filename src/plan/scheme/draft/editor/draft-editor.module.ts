import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {CommonDialogsModule} from 'core/common-dialogs';

import {PlanSharedModule} from '../../../shared/module';
import {SchemeSharedModule} from '../../shared/scheme.module';
import {CourseEditorModule} from './course-editor/course-editor.module';
import {SchemeDraftEditorComponent} from './draft-editor.component';
import {SchemeCourseComponent} from './scheme-course.component';
import {SchemeGroupComponent} from './scheme-group.component';
import {SchemePropertyComponent} from './scheme-property.component';
import {SchemeSummaryComponent} from './scheme-summary.component';
import {SchemeDraftTableComponent} from './scheme-table.component';

@NgModule({
    imports: [
        CommonModule,
        PlanSharedModule,
        SchemeSharedModule,
        CommonDialogsModule,
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
export class SchemeDraftEditorModule {}
