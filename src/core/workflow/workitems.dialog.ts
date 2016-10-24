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

    get last(): any {
        if (!this.options.data) {
            return null;
        } else {
            return this.options.data[0];
        }
    }

    get lastStatus(): any {
        const last = this.last;
        if (!last) {
            return null;
        } else {
            if (!last.dateReceived) {
                return '未收未办';
            } else if (!last.dateProcessed) {
                return '已收未办';
            } else {
                return '已处理';
            }
        }
    }
}
