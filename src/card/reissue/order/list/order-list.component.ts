import {Component} from '@angular/core';

import {ReissueOrderService} from '../order.service';

@Component({
    styles: ['.number{text-align:right}'],
    templateUrl: 'order-list.component.html',
})
export class ReissueOrderListComponent {
    count: number;
    orders: any[];
    max = 10;

    constructor(private service: ReissueOrderService) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.service.loadList({offset, max: this.max}).subscribe(data => {
            this.orders = data.orders;
            this.count = data.count;
        });
    }
}
