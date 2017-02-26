import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewList} from 'core/models';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class LeaveApprovalListComponent {
    list: ReviewList;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {list: ReviewList}) => {
            this.list = data.list;
        });
    }
}
