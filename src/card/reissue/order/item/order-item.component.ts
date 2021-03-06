import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';

import {ReissueOrderService} from '../order.service';
import {ReissueOrder} from '../shared/reissue-order.model';

@Component({
    styleUrls: ['order-item.component.scss'],
    templateUrl: 'order-item.component.html',
})
export class ReissueOrderItemComponent {
    id: string;
    vm: ReissueOrder;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueOrderService,
        @Inject('REISSUES_WEB_URL')
        private reissuesWebUrl: string,
    ) {
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

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }
}
