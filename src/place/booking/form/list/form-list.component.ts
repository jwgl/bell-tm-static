import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {BookingFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
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
