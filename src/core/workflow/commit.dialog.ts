import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {BaseDialog} from '../dialogs';
import {Rest} from '../rest';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-commit-dialog',
    templateUrl: 'commit.dialog.html',
})
export class WorkflowCommitDialog extends BaseDialog {
    result: {what: string, to: string, comment: string};

    constructor(private rest: Rest) {
        super();
        this.result = {what: null, to: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        return this.rest.get(this.options.whoUrl).do((value: any[]) => {
            if (value.length >= 1) {
                this.result.to = value[0].id;
            }
        });
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
