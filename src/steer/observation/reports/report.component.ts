import { Component } from '@angular/core';

import { ReportService } from './report.service';
import { REPORT_LIST } from './shared/constant';

interface ReportNav {
    name: string;
    link: string;
}

@Component({
    selector: 'observation-report',
    templateUrl: 'report.component.html',
})
export class ReportComponent {
    listReport: ReportNav[] = REPORT_LIST;
    tab: number;
    isAdmin: boolean;

    constructor(private service: ReportService) {
        this.service.loadList({ type: null }).subscribe(dto => {
            this.isAdmin = dto.isAdmin;
        });
    }

    tabSelected(id: number) {
        this.tab = id;
    }
}
