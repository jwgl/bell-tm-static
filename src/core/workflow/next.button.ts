import {Directive, EventEmitter, Input, Output} from '@angular/core';

import {NextOptions, Workflow} from './workflow.service';

@Directive({
    selector: 'button[workflow-next]',
    host: {
        '(click)': 'click()',
        '[class]': '"btn btn-primary"',
        '[disabled]': 'workflow.pending',
    },
})
export class WorkflowNextButton {
    @Input('workflow-next') options: NextOptions;
    @Output() nexted = new EventEmitter<any>();

    constructor(private workflow: Workflow) {}

    click() {
        this.workflow.next(this.options).then(data => {
            this.nexted.emit(data);
        }, (error) => {
            alert(error);
        });
    }
}
