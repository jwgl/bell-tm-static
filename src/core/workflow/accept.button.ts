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
    @Output() accepted = new EventEmitter<void>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.accept(this.options).then(() => {
            this.accepted.emit();
        }, (error) => {
            alert(error.json().message);
        });
    }
}
