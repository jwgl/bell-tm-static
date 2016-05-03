import {Component} from '@angular/core';
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

    constructor() {
        super();
    }

    protected onConfirmed(): string {
        return this.comment;
    }
}
