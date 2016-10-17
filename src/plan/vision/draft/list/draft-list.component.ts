import {Component} from '@angular/core';

import {VisionDraftService} from '../draft.service';

/**
 * 所有者培养方案列表。
 */
@Component({
    selector: 'vision-draft-list',
    styleUrls: ['draft-list.component.scss'],
    templateUrl: 'draft-list.component.html',
})
export class VisionDraftListComponent {
    private subjects: any[];

    constructor(private draftServce: VisionDraftService) {
        this.draftServce.loadList().subscribe(data => this.subjects = data);
    }
}
