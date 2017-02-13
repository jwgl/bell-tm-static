import {Component, Inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';

import {ReissueOrderService} from '../order.service';
import {ReissueOrder} from '../shared/reissue-order.model';

@Component({
    selector: 'reissue-order-receive',
    styleUrls: ['order-receive.component.scss'],
    templateUrl: 'order-receive.component.html',
})
export class ReissueOrderReceiveComponent {
    id: string;
    vm: ReissueOrder;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueOrderService,
        @Inject('REISSUE_FORM_WEB_URL')
        private reissueFormWebUrl: String,
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
