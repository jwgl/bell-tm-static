import {Component} from '@angular/core';

import {FreeListenSettings} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent {
    settings: FreeListenSettings;
    forms: any[];
    notice: string;
    count: number;
    max = 10;

    constructor(private service: FreeListenFormService) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.service.loadList({offset, max: this.max}).subscribe(data => {
            this.settings = new FreeListenSettings(data.settings);
            this.count = data.count;
            this.forms = data.forms;
            this.notice = data.notice;
        });
    }
}
