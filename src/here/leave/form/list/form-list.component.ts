import {Component} from '@angular/core';

import {LeaveFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class LeaveFormListComponent {
    forms: any[];
    count: number;
    max = 10;

    constructor(private service: LeaveFormService) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.service.loadList({offset, max: this.max}).subscribe(data => {
            this.count = data.count;
            this.forms = data.forms;
        });
    }
}
