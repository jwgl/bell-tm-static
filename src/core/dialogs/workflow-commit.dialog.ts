import {Component, ElementRef} from 'angular2/core';
import 'rxjs/add/operator/do';

import {BaseDialog} from './dialog';
import {Rest, Observable} from '../http';
import {MODAL_DIRECTIVES} from '../directives';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-commit-dialog',
    template: require('./workflow-commit.html'),
    directives: [MODAL_DIRECTIVES],
})
export class WorkflowCommitDialog extends BaseDialog {
    result: {to: string, comment: string};

    constructor(elementRef: ElementRef, private rest: Rest) {
        super(elementRef);
        this.result = {to: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        if (this.options.whoUrl) {
            return this.rest.get(this.options.whoUrl).do(value => {
                if (value.length >= 1) {
                    this.result.to = value[0].id;
                }
            });
        } else {
            return null;
        }
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
