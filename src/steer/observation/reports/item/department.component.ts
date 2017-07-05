import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { ReportService } from '../report.service';

interface DepartmentReport {
    department: string;
    supervisorTimes: number;
    totalSection: number;
}

@Component({
    selector: 'department-report',
    templateUrl: 'department.component.html',
})
export class DepartmentReportComponent {
    list: DepartmentReport[];
    isAdmin: boolean;

    constructor(
        private route: ActivatedRoute,
        private service: ReportService,
    ) {
        const type: string = this.route.snapshot.params['observer-type'];
        const countBy = type === '1' ? 'DEPARTMENT-U' : 'DEPARTMENT-C';
        this.service.loadList({ type: countBy }).subscribe((dto: any) => {
            this.isAdmin = dto.isAdmin;
            this.list = dto.list;
            this.list.sort((a, b) => a.supervisorTimes - b.supervisorTimes);
        });
    }
}
