import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {ReviewOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-accept]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-primary"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowAcceptButton {
    @Input('workflow-accept') options: ReviewOptions;
    @Output() accepted = new EventEmitter<any>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.accept(this.options).then(data => {
            this.accepted.emit(data);
        }, (error) => {
            alert(error);
        });
    }
}
