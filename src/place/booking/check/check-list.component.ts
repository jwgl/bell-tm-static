import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewList} from 'core/models';

@Component({
    templateUrl: 'check-list.component.html',
})
export class BookingCheckListComponent {
    list: ReviewList;

    constructor(private route: ActivatedRoute) {
        this.route.data.subscribe((data: {list: ReviewList}) => {
            this.list = data.list;
        });
    }
}
