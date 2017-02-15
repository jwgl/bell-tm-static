import {Injectable} from '@angular/core';

import {Dialog} from '../dialogs';
import {ApiUrl, Rest} from '../rest';
import {WorkflowAcceptDialog} from './accept.dialog';
import {WorkflowRejectDialog} from './reject.dialog';
import {WorkflowRevokeDialog} from './revoke.dialog';
import {WorkflowSubmitDialog} from './submit.dialog';
import {WorkflowWorkitemsDialog} from './workitems.dialog';

@Injectable()
export class Workflow {
    constructor(private dialog: Dialog, private rest: Rest, private api: ApiUrl) {}

    submit(id: any, type: 'check' | 'approve', what: string): Promise<void> {
        const whoUrl = type === 'check' ? this.api.checkers(id) : this.api.approvers(id);
        const does = this.typeLabel(type);
        return this.dialog.open(WorkflowSubmitDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.submit(id), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    accept(id: any, wi: string, type: 'check' | 'approve', what: string): Promise<void> {
        const whoUrl = type === 'check' ? this.api.approvers(id) : null;
        const does = this.typeLabel(type);
        return this.dialog.open(WorkflowAcceptDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.accept(id, wi), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    reject(id: any, wi: string, type: 'check' | 'approve', what: string): Promise<void> {
        const does = this.typeLabel(type);
        return this.dialog.open(WorkflowRejectDialog, {does, what}).then(result => {
            return this.rest.patch(this.api.reject(id, wi), {title: result.what, comment: result.comment}).toPromise();
        });
    }

    revoke(id: any, what: string): Promise<void> {
        return this.dialog.open(WorkflowRevokeDialog, {what}).then(result => {
            return this.rest.patch(this.api.revoke(id), {title: result.what, comment: result.comment}).toPromise();
        });
    }

    workitems(workflowInstanceId: string) {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: workflowInstanceId});
    }

    typeLabel(type: 'check' | 'approve'): string {
        return type === 'check' ? '审核' : '审批';
    }
}
