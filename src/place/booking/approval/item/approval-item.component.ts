import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions, RevokeOptions} from 'core/workflow';

import {BookingForm} from '../../shared/form.model';
import {BookingApprovalService} from '../approval.service';

/**
 * 审批补办学生证申请项。
 */
@Component({
    templateUrl: 'approval-item.component.html',
})
export class BookingApprovalItemComponent {
    form: BookingForm;

    private id: string;
    private wi: string;
    constructor(
        private route: ActivatedRoute,
        private service: BookingApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.service.loadItem(this.id, this.wi).subscribe(dto => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto);
        if (this.wi === undefined) {
            this.wi = dto.workitemId;
        }
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }

    get revokeOptions(): RevokeOptions {
        return {
            id: this.id,
            what: this.form.title,
        };
    }
}
