import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';

import {ReissueOrderService} from '../order.service';
import {ReissueOrder} from '../common/reissue-order.model';

@Component({
    selector: 'reissue-order-receive',
    styles: [require('./order-receive.scss')],
    template: require('./order-receive.html'),
})
export class ReissueOrderReceiveComponent {
    id: string;
    vm: ReissueOrder;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueOrderService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id).subscribe(dto => {
            this.vm = ReissueOrder.fromDto(dto);
        });
    }

    receive(item: any, checked: boolean) {
        this.service.receive(this.id, item.formId, checked).subscribe(result => {
            item.status = result.status;
        });
    }

    receiveAll(items: any[], checked: boolean) {
        this.service.receiveAll(this.id, checked).subscribe(result => {
            items.forEach(item => item.status = result.status);
        });
    }

    return() {
        this.router.navigate(['/', this.id]);
    }
}
