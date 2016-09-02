import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import {BaseDialog} from '../dialogs';
import {Rest} from '../rest';

/**
 * options: {whoUrl: string, does: string, what: string}
 */
@Component({
    selector: 'workflow-accept-dialog',
    template: require('./accept.html'),
})
export class WorkflowAcceptDialog extends BaseDialog {
    result: {what: string, to: string, comment: string};

    constructor(private rest: Rest) {
        super();
        this.result = {what: null, to: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
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
