import {Component} from '@angular/core';

import {BookingReportService} from '../report.service';

@Component({
    templateUrl: 'report-list.component.html',
})
export class BookingReportListComponent {
    count: number;
    reports: any[];
    max = 10;

    constructor(private service: BookingReportService) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.service.loadList({offset, max: this.max}).subscribe(data => {
            this.reports = data.reports;
            this.count = data.count;
        });
    }
}
