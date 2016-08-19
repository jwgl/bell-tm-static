import {Component} from '@angular/core';

import {SchemeDraftService} from '../draft.service';

/**
 * 所有者教学计划列表。
 */
@Component({
    selector: 'scheme-draft-list',
    styles: [require('./draft-list.scss')],
    template: require('./draft-list.html'),
})
export class SchemeDraftListComponent {
    private subjects: any[];

    constructor(private draftService: SchemeDraftService) {
        this.draftService.loadList().subscribe(data => this.subjects = data);
    }
}
