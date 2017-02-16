import {Component} from '@angular/core';

import {BookingReportService} from '../report.service';

@Component({
    templateUrl: 'report-list.component.html',
})
export class BookingReportListComponent {
    private reports: any[];

    constructor(private service: BookingReportService) {
        this.service.loadList().subscribe(data => {
            this.reports = data;
        });
    }
}
