import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {AuditStatusComponent} from '../../../../core/components';
import {PLAN_PIPES} from '../../../common/pipes';
import {VisionDraftService} from '../draft.service';

/**
 * 所有者培养方案列表。
 */
@Component({
    selector: 'vision-draft-list',
    styles: [require('./draft-list.scss')],
    template: require('./draft-list.html'),
    directives: [ROUTER_DIRECTIVES, AuditStatusComponent],
    pipes: [PLAN_PIPES],
})
export class VisionDraftListComponent {
    private subjects: any[];

    constructor(private draftServce: VisionDraftService) {
        this.draftServce.loadList().subscribe(data => this.subjects = data);
    }
}
