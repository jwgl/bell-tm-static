import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {RevokeOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-revoke]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-danger"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowRevokeButton {
    @Input('workflow-revoke') options: RevokeOptions;
    @Output() accepted = new EventEmitter<void>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.revoke(this.options).then(() => {
            this.accepted.emit();
        }, (error) => {
            alert(error.json().message);
        });
    }
}
