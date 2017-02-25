import {Component} from '@angular/core';

import {ListGroupOption} from 'core/models';

@Component({
    selector: 'booking-check-container',
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
export class BookingCheckComponent {
    options: ListGroupOption[] = [
        {status: 'PENDING',   label: '待审核', class: 'badge-success'},
        {status: 'PROCESSED', label: '已审核', class: 'badge-danger'},
    ];
}
