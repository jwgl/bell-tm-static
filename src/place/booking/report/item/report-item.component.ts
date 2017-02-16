import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';

import {BookingReportService} from '../report.service';
import {BookingReport} from '../shared/booking-report.model';

@Component({
    styleUrls: ['report-item.component.scss'],
    templateUrl: 'report-item.component.html',
})
export class BookingReportItemComponent {
    id: string;
    vm: BookingReport;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: BookingReportService,
        @Inject('BOOKINGS_WEB_URL')
        private bookingsWebUrl: string,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
            this.vm = BookingReport.fromDto(dto);
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }
}
