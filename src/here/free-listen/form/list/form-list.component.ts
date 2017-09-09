import {Component} from '@angular/core';

import {DateRange} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent {
    dateRange: DateRange;
    forms: any[];
    notice: string;
    count: number;
    max = 10;

    constructor(private service: FreeListenFormService) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.service.loadList({offset, max: this.max}).subscribe(data => {
            this.count = data.count;
            this.forms = data.forms;
            this.dateRange = new DateRange(data.dateRange);
            this.notice = data.notice;
        });
    }
}
