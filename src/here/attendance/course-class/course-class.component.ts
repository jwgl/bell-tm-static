import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from '@angular/router';

import {Subject} from 'rxjs/Subject';

import {RollcallDetail, Student, StudentLeaveDetail} from '../shared/attendance.model';
import {CourseClass} from './course-class.model';
import {CourseClassAttendanceService} from './course-class.service';

@Component({
    styleUrls: ['course-class.component.scss'],
    templateUrl: 'course-class.component.html',
})
export class CourseClassAttendanceComponent {
    courseClass: CourseClass;
    isAdmin = false;

    constructor(
        private service: CourseClassAttendanceService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            if (params['teacherId']) {
                this.service.teacherId = params['teacherId'];
                this.isAdmin = true;
            }
            this.service.loadCourseClass(params['id']).subscribe(dto => {
                this.courseClass = new CourseClass(dto);
            });
        });
    }

    toggle(subject: Subject<void>, student: Student): void {
        if (student.rollcalls || student.leaves) {
            subject.next();
        } else {
            this.service.getStudentAttendances(this.courseClass.id, student.id).subscribe(dto => {
                student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
                student.leaves = dto.leaves.map((a: any) => new StudentLeaveDetail(a));
                subject.next();
            });
        }
    }

    disqualify(student: Student): void {
        this.service.disqualify(this.courseClass.id, student.id, student.disqualified).subscribe(dto => {
            student.disqualified = !student.disqualified;
        }, error => {
            if (this.isAdmin) {
                alert(`${error.json().message}。`);
            } else {
                alert(`${error.json().message}，请与学院教务秘书联系。`);
            }
        });
    }

    get webUrl() {
        return this.service.getWebUrl();
    }
}
