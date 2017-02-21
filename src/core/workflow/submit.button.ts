import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-submit]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-primary"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowSubmitButton {
    @Input('workflow-submit') options: SubmitOptions;
    @Output() submitted = new EventEmitter<void>();

    constructor(private workflow: Workflow, private dialog: CommonDialog) {}

    click() {
        if (this.options.validate) {
            const errors = this.options.validate();
            if (errors && errors.length > 0) {
                this.dialog.error(errors);
                return;
            }
        }

        this.workflow.submit(this.options).then(() => {
            this.submitted.emit();
        }, (error) => {
            alert(error.json().message);
        });
    }
}
