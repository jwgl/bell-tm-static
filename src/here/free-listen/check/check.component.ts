import {Component} from '@angular/core';

import {ListOption} from 'core/models';

import {DateRange} from '../shared/form.model';
import {FreeListenCheckService} from './check.service';

@Component({
    selector: 'free-listen-check-container',
    template: `
<nav-tabs [options]="options">
    <li class="nav-item ml-auto pt-2" *ngIf="dateRange">
        审核时间：{{dateRange.start | date: 'y-MM-dd'}}至{{dateRange.end | date: 'y-MM-dd'}}
    </li>
</nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class FreeListenCheckComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待审核', class: 'badge-success'},
        {type: 'expr', label: '已过期', class: 'badge-danger'},
        {type: 'done', label: '已审核', class: 'badge-danger'},
    ];

    dateRange: DateRange;

    constructor(service: FreeListenCheckService) {
        service.getDateRange().subscribe(data => this.dateRange = new DateRange(data));
    }
}
