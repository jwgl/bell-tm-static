import {Component, Input} from '@angular/core';

import {ListGroup, ListOption} from 'core/models';

import {Workflow} from './workflow.service';

@Component({
    selector: 'nav-tabs',
    styleUrls: ['nav-tabs.component.scss'],
    templateUrl: 'nav-tabs.component.html',
})
export class NavTabsComponent {
    @Input() set options(value: ListOption[]) {
        this.group = new ListGroup(value);
        this.workflow.listGroup = this.group;
    }

    group: ListGroup;

    constructor(private workflow: Workflow) {}
}
