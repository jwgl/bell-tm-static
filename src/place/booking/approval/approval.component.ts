import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ListOption} from 'core/models';

@Component({
    selector: 'booking-approval-container',
    template: `
<nav-tabs [options]="options">
    <li class="nav-item ml-auto">
        <div class="input-group">
            <input type="text" class="form-control form-control-sm" placeholder="查找" [(ngModel)]="query">
            <button class="input-group-addon btn-sm" (click)="search()"><i class="fa fa-search"></i></button>
        </div>
    </li>
</nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class BookingApprovalComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待审批', class: 'badge-success'},
        {type: 'done', label: '已审批', class: 'badge-danger'},
        {type: 'tobe', label: '未审核', class: 'badge-warning'},
    ];

    query: string;

    constructor(private router: Router, private route: ActivatedRoute) {}

    search() {
        if (/#\d+/.test(this.query)) {
            this.router.navigate([this.query.substring(1)], {relativeTo: this.route.firstChild});
        } else {
            this.router.navigate([{query: this.query}]);
        }
    }
}
