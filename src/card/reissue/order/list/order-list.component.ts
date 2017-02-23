import {Component} from '@angular/core';

import {ReissueOrderService} from '../order.service';

@Component({
    templateUrl: 'order-list.component.html',
})
export class ReissueOrderListComponent {
    count: number;
    orders: any[];
    max = 10;

    constructor(private service: ReissueOrderService) {
        this.loadData(0)
    }

    loadData(offset: number) {
        this.service.loadList().subscribe(data => {
            this.orders = data;
        });
    }
}
