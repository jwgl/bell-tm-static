import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {LeaveApprovalService} from '../approval.service';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class LeaveApprovalListComponent {
    statuses: any[] = [
        {status: 'SUBMITTED', label: '待处理', class: 'badge-success'},
        {status: 'APPROVED',  label: '已审批', class: 'badge-info'},
        {status: 'FINISHED',  label: '已销假', class: 'badge-danger'},
    ];

    status: string;
    counts: {[key: string]: number};
    forms: any[];
    max = 10;

    constructor(private route: ActivatedRoute, private service: LeaveApprovalService) {
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
