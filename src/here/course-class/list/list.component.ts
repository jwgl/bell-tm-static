import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from '@angular/router';

import {Subject} from 'rxjs/Subject';

import {Attendance, CourseClass, Student} from './list.model';
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
                student.rollcalls = dto.filter((it: any) => it.type !== 4).map((a: any) => new Attendance(a));
                student.leaves = dto.filter((it: any) => it.type === 4).map((a: any) => new Attendance(a));
                subject.next();
            });
        }
    }

    get webUrl() {
        return this.service.getWebUrl();
    }
}
