import {Component} from '@angular/core';

import {ListGroupOption} from 'core/models';

@Component({
    selector: 'leave-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class LeaveApprovalComponent {
    options: ListGroupOption[] = [
        {status: 'SUBMITTED', label: '待处理', class: 'badge-success'},
        {status: 'APPROVED',  label: '已审批', class: 'badge-info'},
        {status: 'FINISHED',  label: '已销假', class: 'badge-danger'},
    ];
}
