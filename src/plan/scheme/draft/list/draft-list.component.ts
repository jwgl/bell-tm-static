import {Component} from '@angular/core';

import {SchemeDraftService} from '../draft.service';

/**
 * 所有者教学计划列表。
 */
@Component({
    selector: 'scheme-draft-list',
    styleUrls: ['draft-list.component.scss'],
    templateUrl: 'draft-list.component.html',
})
export class SchemeDraftListComponent {
    private subjects: any[];

    constructor(private service: SchemeDraftService) {
        this.service.loadList().subscribe(data => this.subjects = data);
    }
}
