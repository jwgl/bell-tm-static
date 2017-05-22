import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from '@angular/router';

import {Subject} from 'rxjs/Subject';

import {RollcallDetail, Student, StudentLeaveDetail} from '../shared/attendance.model';
import {CourseClass} from './list.model';
import {CourseClassListMainService} from './main.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class CourseClassListComponent {
    courseClass: CourseClass;

    constructor(
        private service: CourseClassListMainService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadItem(params['id']).subscribe(dto => {
                this.courseClass = new CourseClass(dto);
                this.service.getCourseClassStats(this.courseClass.id).subscribe(stats => {
                    this.courseClass.setStats(stats);
                });
            });
        });
    }

    toggle(subject: Subject<void>, student: Student): void {
        if (student.rollcalls || student.leaves) {
            subject.next();
        } else {
            this.service.getStudentAttendances(this.courseClass.id, student.id).subscribe(dto => {
                student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
                student.leaves = dto.studentLeaves.map((a: any) => new StudentLeaveDetail(a));
                subject.next();
            });
        }
    }

    get webUrl() {
        return this.service.getWebUrl();
    }
}
