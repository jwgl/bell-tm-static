import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'leave-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class LeaveApprovalComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待处理', class: 'badge-success'},
        {type: 'done', label: '已审批', class: 'badge-info'},
        {type: 'next', label: '已销假', class: 'badge-danger'},
    ];
}
