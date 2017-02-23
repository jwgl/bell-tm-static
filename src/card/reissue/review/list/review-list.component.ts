import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReissueReviewService} from '../review.service';

@Component({
    styleUrls: ['review-list.component.scss'],
    templateUrl: 'review-list.component.html',
})
export class ReissueReviewListComponent {
    statuses: any[] = [
        {status: 'SUBMITTED', label: '待审核', class: 'badge-success'},
        {status: 'CHECKED',   label: '已审核', class: 'badge-info'},
        {status: 'PROGRESS',  label: '制作中', class: 'badge-info'},
        {status: 'FINISHED',  label: '已完成', class: 'badge-danger'},
    ];

    status: string;
    counts: {[key: string]: number};
    forms: any[];
    max = 10;

    constructor(private route: ActivatedRoute, private service: ReissueReviewService) {
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
