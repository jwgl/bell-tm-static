import {Directive, Input} from '@angular/core';

import {ReviewOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-workitems]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-secondary"',
        '[hidden]': '!workflowInstanceId',
    },
})
export class WorkflowWorkitemsButton {
    @Input('workflow-workitems') workflowInstanceId: string;

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.workitems(this.workflowInstanceId);
    }
}
