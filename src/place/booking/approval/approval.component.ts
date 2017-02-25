import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ListGroupOption} from 'core/models';

@Component({
    selector: 'booking-approval-container',
    template: `
<div class="row">
    <div class="col-md-3">
        <list-group [options]="options"></list-group>
    </div>
    <div class="col-md-9">
        <router-outlet></router-outlet>
    </div>
</div>`,
})
export class BookingApprovalComponent {
    options: ListGroupOption[] = [
        {status: 'PENDING',   label: '待审批', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审批', class: 'badge-danger'},
        {status: 'UNCHECKED', label: '未审核', class: 'badge-warning'},
    ];
}
