import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {CourseClassAttendanceService} from './course-class.service';

@Component({
    selector: 'course-class-list-container',
    templateUrl: 'teacher.component.html',
})
export class TeacherCourseClassComponent {
    courseClasses: any;

    constructor(
        private router: Router,
        private service: CourseClassAttendanceService,
    ) {
        this.service.loadCourseClasses().subscribe(courseClasses => {
            this.courseClasses = courseClasses;
            if (this.router.url === '/') {
                this.router.navigate([this.courseClasses[0].id]);
            }
        });
    }
}
