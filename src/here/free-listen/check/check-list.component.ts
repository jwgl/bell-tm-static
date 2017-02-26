import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewList} from 'core/models';

@Component({
    styleUrls: ['check-list.component.scss'],
    templateUrl: 'check-list.component.html',
})
export class FreeListenCheckListComponent {
    list: ReviewList;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {list: ReviewList}) => {
            this.list = data.list;
        });
    }
}
