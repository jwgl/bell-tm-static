import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from '../dialogs';

/**
 * options: {does: string, what: string}
 */
@Component({
    selector: 'workflow-reject-dialog',
    template: require('./reject.html'),
})
export class WorkflowRejectDialog extends BaseDialog {
    result: {what: string, comment: string};

    constructor() {
        super();
        this.result = {what: null, comment: null};
    }

    protected onOpening(): Observable<any> {
        this.result.what = this.options.what;
        return null;
    }

    protected onConfirmed(): any {
        return this.result;
    }
}
