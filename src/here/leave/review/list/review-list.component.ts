import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {LeaveReviewService} from '../review.service';

/**
 * 学生请假审批列表。
 */
@Component({
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class LeaveReviewListComponent {
    statuses: any[] = [
        {status: 'SUBMITTED', label: '待审核', class: 'badge-success'},
        {status: 'FINISHED',  label: '已审核', class: 'badge-info'},
    ];

    private counts: {[key: string]: number};
    private forms: any[];
    private status = 'SUBMITTED';
    private offset: number;
    private max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LeaveReviewService,
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
