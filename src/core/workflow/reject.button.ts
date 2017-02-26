import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {ReviewOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-reject]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-secondary"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowRejectButton {
    @Input('workflow-reject') options: ReviewOptions;
    @Output() rejected = new EventEmitter<any>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.reject(this.options).then(data => {
            this.rejected.emit(data);
        }, (error) => {
            alert(error);
        });
    }
}
