import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FreeListenCheckService} from '../check.service';

@Component({
    styleUrls: ['check-list.component.scss'],
    templateUrl: 'check-list.component.html',
})
export class FreeListenCheckListComponent {
    statuses: any[] = [
        {status: 'PENDING',   label: '待审核', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审核', class: 'badge-danger'},
    ];

    status: string;
    counts: {[key: string]: number};
    forms: any[];
    max = 10;

    constructor(private route: ActivatedRoute, private service: FreeListenCheckService) {
        this.route.params.subscribe(params => {
            this.status = params['status'];
            this.loadData(0);
        });
    }

    loadData(offset: number) {
        this.service.loadList({status: this.status, offset, max: this.max }).subscribe(result => {
            this.counts = result.counts;
            this.forms = result.forms;
        });
    }
}
