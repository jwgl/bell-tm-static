import {Component} from '@angular/core';

import {ReissueOrderService} from '../order.service';

/**
 * 补办学生证制作订单列表。
 */
@Component({
    templateUrl: 'order-list.component.html',
})
export class ReissueOrderListComponent {
    private orders: any[];

    constructor(private service: ReissueOrderService) {
        this.service.loadList().subscribe(data => {
            this.orders = data;
        });
    }
}
