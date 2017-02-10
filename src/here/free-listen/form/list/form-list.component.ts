import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {FreeListenFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class FreeListenFormListComponent {
    private forms: any[];
    private offset: number;
    private max = 10;
    private count: number;

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
        });
    }

    create() {
        this.router.navigate(['/', 'create']);
    }
}
