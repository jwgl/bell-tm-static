import { Component } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

import { ReportService } from '../report.service';

interface ObservationReport {
    supervisorId: string;
    supervisorName: string;
    departmentName: string;
    supervisorTimes: number;
    totalSection: number;
}

@Component({
    selector: 'observation-report',
    templateUrl: 'observation-report.component.html',
})
export class ObservationReportComponent {
    list: ObservationReport[];

    constructor(
        private route: ActivatedRoute,
        private service: ReportService,
    ) {
        this.route.params.subscribe(params => {
            this.service.loadList({type: params['observer-type'] === '1' ? 'OBSERVER-U' : 'OBSERVER-C'}).subscribe(dto => {
                this.list = dto.list;
                this.list.sort((a, b) => a.supervisorTimes - b.supervisorTimes);
            });
        });
    }
}
