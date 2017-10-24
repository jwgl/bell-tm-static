import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {CommonDirectivesModule} from 'core/common-directives';
import {RestModule} from 'core/rest';

import {CourseClassAttendanceModule} from './course-class.module';
import {CourseClassRoutingModule} from './course-class.routing';
import {CourseClassAttendanceService} from './course-class.service';
import {DepartmentCourseClassComponent} from './department.component';
import {DepartmentCourseClassService} from './department.service';

@NgModule({
    bootstrap: [DepartmentCourseClassComponent],
    declarations: [
        DepartmentCourseClassComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CommonDirectivesModule,
        RestModule.for('/api/here/departments/${departmentId}/courseClassTeachers'),
        CourseClassRoutingModule,
        CourseClassAttendanceModule,
    ],
    providers: [
        DepartmentCourseClassService,
        {provide: CourseClassAttendanceService, useExisting: DepartmentCourseClassService},
        {provide: 'TEACHER_COURSE_CLASS_API_URL', useValue: '/api/here/teachers/${teacherId}/courseClasses'},
        {provide: 'COURSE_CLASS_API_URL', useValue: '/api/here/courseClasses'},
        {provide: 'ATTENDANCE_TERMS', useValue: '/api/here/attendances/terms'},
    ],
})
class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);
