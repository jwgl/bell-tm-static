import {Component} from '@angular/core';

import {FreeListenConfig} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent {
    config: FreeListenConfig;
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
            this.config = new FreeListenConfig(data.config);
            this.notice = data.notice;
        });
    }
}
