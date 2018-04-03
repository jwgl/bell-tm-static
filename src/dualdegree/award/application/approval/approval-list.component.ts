import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewList} from 'core/models';

const dateLabels: {[key: string]: string} = {
    todo: '申请时间',
    done: '审批时间',
};

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class ApplicationApprovalListComponent {
    list: ReviewList;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {list: ReviewList}) => {
            this.list = data.list;
        });
    }

    get dateLabel(): string {
        return dateLabels[this.list.type];
    }
}
