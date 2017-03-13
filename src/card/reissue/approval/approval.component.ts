import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'reissue-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class ReissueApprovalComponent {
    options: ListOption[] = [
        {type: 'todo', label: '待审批', class: 'badge-success'},
        {type: 'done', label: '已审批', class: 'badge-danger'},
    ];
}
