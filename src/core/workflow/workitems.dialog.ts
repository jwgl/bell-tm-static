import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {BaseDialog} from '../dialogs';
import {Rest} from '../rest';

/**
 * options: {instance: string}
 */
@Component({
    selector: 'workflow-workitems-dialog',
    templateUrl: 'workitems.dialog.html',
})
export class WorkflowWorkitemsDialog extends BaseDialog {
    constructor(private rest: Rest) {
        super();
    }

    protected onOpening(): Observable<any> {
        return this.rest.get(`/api/core/workflows/${this.options.instance}/workitems`);
    }
}
