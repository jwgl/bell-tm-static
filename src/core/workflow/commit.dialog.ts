import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from '../dialogs';
import {Rest} from '../http';
import 'rxjs/add/operator/do';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-commit-dialog',
    template: require('./commit.html'),
})
export class WorkflowCommitDialog extends BaseDialog {
    result: {what: string, to: string, comment: string};

    constructor(private rest: Rest) {
        super();
        this.result = {what: null, to: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        return this.rest.get(this.options.whoUrl).do(value => {
            if (value.length >= 1) {
                this.result.to = value[0].id;
            }
        });
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
