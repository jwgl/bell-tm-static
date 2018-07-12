import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
        this.route.params.subscribe(params => {
            this.service.loadList({ type: params['observer-type'] === '1' ? 'TEACHER-U' : 'TEACHER-C'}).subscribe(dto => {
                this.list = dto;
                this.list.sort((a, b) => b.supervisorTimes - a.supervisorTimes);
            });
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
