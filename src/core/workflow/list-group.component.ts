import {Component, Input} from '@angular/core';

import {ListGroup, ListOption} from 'core/models';

import {Workflow} from './workflow.service';

@Component({
    selector: 'list-group',
    template: `
<div class="list-group">
    <a *ngFor="let item of group.items" class="list-group-item list-group-item-action justify-content-between"
        [routerLink]="['/list', item.type]"
        [class.active]="item.active">
        {{item.label}} <span>{{item.count}}</span>
    </a>
</div>`,
})
export class ListGroupComponent {
    @Input() set options(value: ListOption[]) {
        this.group = new ListGroup(value);
        this.workflow.listGroup = this.group;
    }

    group: ListGroup;

    constructor(private workflow: Workflow) {}
}
