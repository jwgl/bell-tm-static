import {Component} from 'angular2/core';
import {BaseDialog} from './dialog';
import {Rest, Observable} from '../http';
import {MODAL_DIRECTIVES} from '../directives';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-accept-dialog',
    template: require('./workflow-accept.dialog'),
    directives: [MODAL_DIRECTIVES],
})
export class WorkflowAcceptDialog extends BaseDialog {
    result: {to: string, comment: string};

    constructor(private rest: Rest) {
        super();
        this.result = {to: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        return this.rest.get(this.options.whoUrl)
        .do(value => {
            if (value.length >= 1) {
                this.result.to = value[0].id;
            }
        });
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
