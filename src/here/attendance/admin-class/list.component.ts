import {Component} from '@angular/core';
import {ActivatedRoute, Router, RouterState} from '@angular/router';

import {Subject} from 'rxjs/Subject';

import {RollcallDetail, Student, StudentLeaveDetail} from '../shared/attendance.model';
import {AdminClassListMainService} from './main.service';

@Component({
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
})
export class AdminClassListComponent {
    students: Student[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: AdminClassListMainService,
    ) {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id === 'all') {
                this.service.loadList().subscribe(dto => this.onLoadData(dto));
            } else {
                this.service.loadListByAdminClass(id).subscribe(dto => this.onLoadData(dto));
            }
        });
    }

    onLoadData(data: any[]) {
        this.students = data.map((s: any) => new Student(s));
    }

    toggle(subject: Subject<void>, student: Student): void {
        if (student.rollcalls || student.leaves) {
            subject.next();
        } else {
            this.service.loadItem(student.id).subscribe(dto => {
                student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
                student.leaves = dto.leaves.map((a: any) => new StudentLeaveDetail(a));
                subject.next();
            });
        }
    }

    get statisUrl() {
         return `/web/here/attendances/statisReport?termId=${this.service.termId}`;
    }

    get detailUrl() {
        return `/web/here/attendances/detailReport?termId=${this.service.termId}`;
    }

    get disqualUrl() {
        return `/web/here/attendances/disqualReport?termId=${this.service.termId}`;
    }
}
