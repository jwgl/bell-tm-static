import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {DepartmentCourseClassService} from './department.service';

@Component({
    selector: 'course-class-list-container',
    templateUrl: 'department.component.html',
})
export class DepartmentCourseClassComponent {
    teachers: any[];
    courseClasses: any[];

    constructor(
        private router: Router,
        private service: DepartmentCourseClassService,
    ) {
        this.service.loadCourseClassTeachers().subscribe(teachers => {
            this.teachers = teachers;
            if (this.teachers.length > 0) {
                this.loadTeacher(this.teachers[0].id);
            }
        });
    }

    loadTeacher(teacherId: string, navigate = false): void {
        this.service.teacherId = teacherId;
        this.service.loadCourseClasses().subscribe(courseClasses => {
            this.courseClasses = courseClasses;
            if (navigate || this.router.url === '/') {
                this.router.navigate([teacherId, this.courseClasses[0].id]);
            }
        });
    }

    teacherChanged(teacherId: string) {
        this.loadTeacher(teacherId, true);
    }

    get teacherId(): string {
        return this.service.teacherId;
    }
}
