import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {RevokeOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-revoke]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-secondary"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowRevokeButton {
    @Input('workflow-revoke') options: RevokeOptions;
    @Output() revoked = new EventEmitter<any>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.revoke(this.options).then(data => {
            this.revoked.emit(data);
        }, (error) => {
            alert(error);
        });
    }
}
