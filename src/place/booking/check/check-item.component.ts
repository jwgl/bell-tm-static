import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions} from 'core/workflow';

import {BookingForm} from '../shared/form.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class BookingCheckItemComponent {
    form: BookingForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new BookingForm(dto.form);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'check',
            what: this.form.title,
        };
    }
}
