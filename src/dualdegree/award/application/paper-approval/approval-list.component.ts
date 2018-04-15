import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {ReviewList} from 'core/models';
import {ApiUrl} from 'core/rest';

@Component({
    styleUrls: ['approval-list.component.scss'],
    templateUrl: 'approval-list.component.html',
})
export class PaperApprovalListComponent {
    list: ReviewList;

    constructor(
        route: ActivatedRoute,
        private api: ApiUrl) {
        route.data.subscribe((data: { list: ReviewList }) => {
            this.list = data.list;
        });
    }

    downloadUrl(): string {
        return `${this.api.list()}/attachments?awardId=${this.list.items[0].awardId}`;
    }

    get downloadAble(): boolean {
        const match = window.location.href.match(/\/todo+/);
        return !_.isEmpty(match);
    }
}
