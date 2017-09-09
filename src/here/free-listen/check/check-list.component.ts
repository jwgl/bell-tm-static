import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewList} from 'core/models';

const dateLabels: {[key: string]: string} = {
    todo: '申请时间',
    expr: '申请时间',
    done: '审核时间',
};

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

    get dateLabel(): string {
        return dateLabels[this.list.type];
    }
}
