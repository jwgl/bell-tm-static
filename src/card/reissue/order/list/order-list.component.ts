import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ReissueOrderService} from '../order.service';

/**
 * 补办学生证制作订单列表。
 */
@Component({
    selector: 'reissue-order-list',
    templateUrl: 'order-list.component.html',
})
export class ReissueOrderListComponent {
    private orders: any[];

    constructor(
        private service: ReissueOrderService,
        private router: Router,
    ) {
        this.service.loadList().subscribe(data => {
            this.orders = data;
        });
    }

    create() {
        this.router.navigate(['/', 'create']);
    }
}
