import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {LeaveApprovalService} from '../approval.service';

/**
 * 学生请假审批列表。
 */
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

    private counts: {[key: string]: number};
    private forms: any[];
    private status = 'SUBMITTED';
    private offset: number;
    private max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LeaveApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadData(0);
        });
    }

    loadData(offset: number) {
        this.offset = offset;
        this.service.loadList({
            status: this.status,
            offset: this.offset,
            max: this.max,
        }).subscribe(result => {
            this.counts = result.counts;
            this.forms = result.forms;
        });
    }
}
