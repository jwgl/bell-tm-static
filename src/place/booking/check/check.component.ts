import {Component} from '@angular/core';

import {ListGroupOption} from 'core/models';

@Component({
    selector: 'booking-check-container',
    template: `
<nav-tabs [options]="options"></nav-tabs>
<router-outlet></router-outlet>
`,
})
export class BookingCheckComponent {
    options: ListGroupOption[] = [
        {status: 'PENDING',   label: '待审核', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审核', class: 'badge-danger'},
    ];
}
