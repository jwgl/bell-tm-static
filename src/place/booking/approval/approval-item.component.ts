import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions, RevokeOptions} from 'core/workflow';

import {BookingForm} from '../shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class BookingApprovalItemComponent {
    form: BookingForm;

    private wi: string;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto.form);
        if (this.wi === undefined) {
            this.wi = dto.wi;
        }
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }

    get revokeOptions(): RevokeOptions {
        return {
            id: this.form.id,
            what: this.form.title,
        };
    }
}
