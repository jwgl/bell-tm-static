import {Component} from 'angular2/core';
import {BaseDialog} from './dialog';
import {Rest, Observable} from '../http';
import {FromNowPipe, ActionNamePipe, ActionClassPipe} from '../pipes';
import {MODAL_DIRECTIVES} from '../directives';

/**
 * options: {instance: string}
 */
@Component({
    selector: 'workflow-workitems-dialog',
    template: require('./workflow-workitems.html'),
    directives: [MODAL_DIRECTIVES],
    pipes: [FromNowPipe, ActionNamePipe, ActionClassPipe],
})
export class WorkflowWorkitemsDialog extends BaseDialog {
    constructor(private rest: Rest) {
        super();
    }

    protected onOpening(): Observable<any> {
        return this.rest.get(`/api/workflows/${this.options.instance}/workitems`);
    }
}
