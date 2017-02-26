import {Component} from '@angular/core';

import {ListGroupOption} from 'core/models';

@Component({
    selector: 'booking-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class BookingApprovalComponent {
    options: ListGroupOption[] = [
        {status: 'PENDING',   label: '待审批', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审批', class: 'badge-danger'},
        {status: 'UNCHECKED', label: '未审核', class: 'badge-warning'},
    ];
}
