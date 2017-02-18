import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {FreeListenConfig} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent {
    config: FreeListenConfig;
    forms: any[];
    count: number;
    max = 10;
    private offset: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: FreeListenFormService,
    ) {
        this.loadData(0);
    }

    loadData(offset: number) {
        this.offset = offset;
        this.service.loadList().subscribe(data => {
            this.count = data.count;
            this.forms = data.forms;
            this.config = new FreeListenConfig(data.config);
        });
    }

    create() {
        this.router.navigate(['/', 'create']);
    }
}
