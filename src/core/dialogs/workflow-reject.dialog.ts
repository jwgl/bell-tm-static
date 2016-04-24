import {Component, ElementRef} from 'angular2/core';
import {BaseDialog} from './dialog';
import {MODAL_DIRECTIVES} from '../directives';

/**
 * options: {does: string, what: string}
 */
@Component({
    selector: 'workflow-reject-dialog',
    template: require('./workflow-reject.html'),
    directives: [MODAL_DIRECTIVES],
})
export class WorkflowRejectDialog extends BaseDialog {
    comment: string;

    constructor(elementRef: ElementRef) {
        super(elementRef);
    }

    protected onConfirmed(): string {
        return this.comment;
    }
}
