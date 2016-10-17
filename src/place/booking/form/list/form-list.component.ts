import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {BookingFormService} from '../form.service';

@Component({
    selector: 'reissue-form-list',
    styles: [require('./form-list.scss')],
    template: require('./form-list.html'),
})
export class BookingFormListComponent {
    private user: {phoneNumber: string};
    private count: number;
    private forms: any[];
    private offset: number;
    private max = 10;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: BookingFormService,
    ) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.offset = offset;
        this.service.loadList().subscribe(data => {
            this.user = data.user;
            this.count = data.count;
            this.forms = data.forms;
        });
    }

    create() {
        this.router.navigate(['/', 'create']);
    }

    canApply() {
        return !!this.user.phoneNumber;
    }
}