import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';

import { ReportService } from '../report.service';

interface TeacherSupervisedReport {
    teacherId: string;
    teacherName: string;
    supervisorTimes: number;
    departmentName: string;
}
@Component({
    selector: 'teacher-supervisored-report',
    templateUrl: 'teacher-supervised.component.html',
})
export class TeacherSupervisedComponent {
    list: TeacherSupervisedReport[];
    type: string;

    constructor(
        private route: ActivatedRoute,
        private service: ReportService,
    ) {

        const type: string = this.route.snapshot.params['observer-type'];
        const countBy = (type === '1') ? 'TEACHER-U' : 'TEACHER-C';
        this.service.loadList({ type: countBy }).subscribe(dto => {
            this.list = dto;
            this.list.sort((a, b) => b.supervisorTimes - a.supervisorTimes);
        });
    }

    get departmentTitle(): string {
        if (this.type === 'university') {
            return '所在单位';
        } else {
            return '开课单位';
        }
    }
}
