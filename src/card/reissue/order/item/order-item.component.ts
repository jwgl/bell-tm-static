import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';

import {ReissueOrderService} from '../order.service';
import {ReissueOrder} from '../common/reissue-order.model';

@Component({
    selector: 'reissue-order-item',
    styles: [require('./order-item.scss')],
    template: require('./order-item.html'),
})
export class ReissueOrderItemComponent {
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

    edit() {
        this.router.navigate(['/', this.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }
}
