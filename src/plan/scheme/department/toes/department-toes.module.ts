import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {CommonDialogsModule} from 'core/common-dialogs';
import {CommonDirectivesModule} from 'core/common-directives';
import {PlanCommonModule} from '../../../common/module';
import {SchemeDepartmentToesComponent} from './department-toes.component';
import {SchemeCourseToesComponent} from './scheme-course.component';
import {PropertyToesPipe} from './property-toes.pipe';
import {SchemeCourseToesPipe} from './scheme-course-toes.pipe';
import {SchemeCourseDialog} from './scheme-course.dialog';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PlanCommonModule,
        CommonDialogsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        SchemeDepartmentToesComponent,
        SchemeCourseToesComponent,
        PropertyToesPipe,
        SchemeCourseToesPipe,
        SchemeCourseDialog,
    ],
    exports: [
        SchemeDepartmentToesComponent,
    ],
    entryComponents: [
        SchemeCourseDialog,
    ],
})
export class SchemeDepartmentToesModule {}
