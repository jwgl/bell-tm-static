import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewList} from 'core/models';

@Component({
    templateUrl: 'approval-list.component.html',
})
export class BookingApprovalListComponent {
    list: ReviewList;

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe((data: {list: ReviewList}) => {
            this.list = data.list;
        });
    }
}
