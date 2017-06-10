import {Directive, ElementRef, Input} from '@angular/core';

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

    private button: HTMLButtonElement;

    constructor(elementRef: ElementRef, private workflow: Workflow) {
        this.button = elementRef.nativeElement as HTMLButtonElement;
    }

    ngAfterViewInit() {
        if (!this.workflowInstanceId) {
            this.button.parentElement.classList.remove('ml-2');
        }
    }

    click() {
        this.workflow.workitems(this.workflowInstanceId);
    }
}
