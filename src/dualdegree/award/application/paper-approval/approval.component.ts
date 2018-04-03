import {Component} from '@angular/core';

import {ListOption} from 'core/models';

import {PaperApprovalService} from './approval.service';

@Component({
    selector: 'paper-approval-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
    `,
})
export class PaperApprovalComponent {
    options: ListOption[] = [
        {type: 'todo', label: '论文待审', class: 'badge-secondary'},
        {type: 'done', label: '论文已审', class: 'badge-dark'},
    ];

    constructor(service: PaperApprovalService) {
        const cookieAttributes: string[] = document.cookie.split(';');
        const csrf = cookieAttributes.filter((attr: string) => attr.includes('XSRF-TOKEN=')).toString();
        service.xsrfToken = csrf.replace('XSRF-TOKEN=', '');
    }
}
