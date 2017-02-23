import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {BookingApprovalService} from '../approval.service';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class BookingApprovalListComponent {
    statuses: any[] = [
        {status: 'PENDING',   label: '待审批', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审批', class: 'badge-danger'},
        {status: 'UNCHECKED', label: '未审核', class: 'badge-warning'},
    ];

    status: string;
    counts: {[key: string]: number};
    forms: any[];
    max = 10;

    constructor(private route: ActivatedRoute, private service: BookingApprovalService) {
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadData(0);
        });
    }

    loadData(offset: number) {
        this.service.loadList({status: this.status, offset, max: this.max}).subscribe(result => {
            this.counts = result.counts;
            this.forms = result.forms;
        });
    }
}
