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

    get showLast(): boolean {
        return this.options.data[0].toUser && !this.options.data[0].dateProcessed;
    }

    get lastToUser(): any {
        return this.options.data[0].toUser;
    }

    get lastStatus(): any {
        if (!this.options.data[0].dateReceived) {
            return '未收未办';
        } else if (!this.options.data[0].dateProcessed) {
            return '已收未办';
        } else {
            return '已处理';
        }
    }
}
