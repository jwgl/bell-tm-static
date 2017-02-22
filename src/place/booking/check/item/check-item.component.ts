import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewOptions} from 'core/workflow';

import {BookingForm} from '../../shared/form.model';
import {BookingCheckService} from '../check.service';

@Component({
    templateUrl: 'check-item.component.html',
})
export class BookingCheckItemComponent {
    form: BookingForm;

    private id: string;
    private wi: string;

    constructor(
        private route: ActivatedRoute,
        private service: BookingCheckService,
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
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: 'check',
            what: this.form.title,
        };
    }
}
