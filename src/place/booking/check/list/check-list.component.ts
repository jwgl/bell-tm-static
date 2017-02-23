import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BookingCheckService} from '../check.service';

@Component({
    styleUrls: ['check-list.component.scss'],
    templateUrl: 'check-list.component.html',
})
export class BookingCheckListComponent {
    statuses: any[] = [
        {status: 'PENDING',   label: '待审核', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审核', class: 'badge-danger'},
    ];

    status: string;
    counts: {[key: string]: number};
    forms: any[];
    max = 10;

    constructor(private route: ActivatedRoute, private service: BookingCheckService) {
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
