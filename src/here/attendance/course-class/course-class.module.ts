import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CommonDirectivesModule} from 'core/common-directives';

import {CourseClassAttendanceComponent} from './course-class.component';

@NgModule({
    imports: [
        CommonModule,
        CommonDirectivesModule,
    ],
    declarations: [
        CourseClassAttendanceComponent,
    ],
    exports: [
        CourseClassAttendanceComponent,
    ],
})
export class CourseClassAttendanceModule {}
