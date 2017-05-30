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
        });
    }

    get webUrl() {
        return this.service.getWebUrl();
    }
}
