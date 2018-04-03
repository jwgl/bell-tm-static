import {Component} from '@angular/core';

import {ListOption} from 'core/models';

@Component({
    selector: 'application-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class ApplicationApprovalComponent {
    options: ListOption[] = [
        {type: 'todo', label: '材料待审', class: 'badge-success'},
        {type: 'done', label: '材料已审', class: 'badge-info'},
    ];
}
