import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DepartmentCourseClassService} from './department.service';

@Component({
    selector: 'course-class-list-container',
    templateUrl: 'department.component.html',
})
export class DepartmentCourseClassComponent {
    terms: number[];
    selectedTerm: number;
    teachers: any[];
    selectedTeacher: string;
    courseClasses: any[];

    constructor(
        private service: DepartmentCourseClassService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.service.loadTerms().subscribe(terms => {
            this.terms = terms;
            if (this.router.url === '/') {
                this.selectedTerm = terms[0];
                this.loadTeachers(true);
            }
        });

        this.service.courseClassLoaded.subscribe(courseClass => {
            if (courseClass.termId !== this.selectedTerm) {
                this.selectedTerm = courseClass.termId;
                this.loadTeachers(false, courseClass.teacherId);
            }
        });
    }

    loadTeachers(navigate: boolean, teacherId: string = null): void {
        this.service.loadCourseClassTeachers(this.selectedTerm).subscribe(teachers => {
            this.teachers = teachers;
            if (navigate) {
                if (this.teachers.length > 0) {
                    this.teacherId = this.teachers[0].id;
                    this.loadCourseClasses(navigate);
                }
            } else {
                this.teacherId = teacherId;
                this.loadCourseClasses(navigate);
            }
        });
    }

    loadCourseClasses(navigate = false): void {
        this.service.loadCourseClasses(this.selectedTerm).subscribe(courseClasses => {
            this.courseClasses = courseClasses;
            if (navigate) {
                this.router.navigate([this.teacherId, this.courseClasses[0].id]);
            }
        });
    }

    get teacherId(): string {
        return this.service.teacherId;
    }

    set teacherId(value: string) {
        this.service.teacherId = value;
    }
}
