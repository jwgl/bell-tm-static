import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {FreeListenApprovalService} from '../approval.service';

/**
 * 审核补办学生证列表。
 */
@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class FreeListenApprovalListComponent {
    statuses: any[] = [
        {status: 'PENDING',   label: '待审核', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审核', class: 'badge-danger'},
        {status: 'UNCHECKED', label: '未审核', class: 'badge-warning'},
    ];

    private counts: {[key: string]: number};
    private forms: any[];
    private status: string;
    private offset: number;
    private max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: FreeListenApprovalService,
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
