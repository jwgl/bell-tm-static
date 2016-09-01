import {NgModule, Injectable, Inject, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {Rest, ApiUrl} from './http';
import {Dialog, provideDialog} from './dialogs';
import {ModalDirectivesModule} from './directives';
import {WorkflowCommitDialog} from './workflow/commit.dialog';
import {WorkflowAcceptDialog} from './workflow/accept.dialog';
import {WorkflowRejectDialog} from './workflow/reject.dialog';
import {WorkflowWorkitemsDialog} from './workflow/workitems.dialog';

const WORKFLOW_DIALOG = new OpaqueToken('Workflow Dialog');

@Injectable()
export class Workflow {
    constructor(@Inject(WORKFLOW_DIALOG)private dialog: Dialog, private rest: Rest, private api: ApiUrl) {}

    commit(id: string, what: string): Promise<void> {
        const whoUrl = this.api.checkers(id);
        const does = '审核';
        return this.dialog.open(WorkflowCommitDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.commit(id), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    accept(id: string, wi: string, type: string, what: string): Promise<void> {
        const whoUrl = type === 'check' ? this.api.approvers(id, wi) : null;
        const does = type === 'check' ? '审核' : '审批';
        return this.dialog.open(WorkflowAcceptDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.accept(id, wi), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    reject(id: string, wi: string, type: string, what: string): Promise<void> {
        const does = type === 'check' ? '审核' : '审批';
        return this.dialog.open(WorkflowRejectDialog, {does, what}).then(result => {
            return this.rest.patch(this.api.reject(id, wi), {title: result.what, comment: result.comment}).toPromise();
        });
    }

    workitems(workflowInstanceId: string) {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: workflowInstanceId});
    }
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ModalDirectivesModule,
    ],
    declarations: [
        WorkflowCommitDialog,
        WorkflowAcceptDialog,
        WorkflowRejectDialog,
        WorkflowWorkitemsDialog,
    ],
    providers: [
        provideDialog(WORKFLOW_DIALOG, WorkflowModule),
        Workflow,
    ],
    exports: [
        WorkflowCommitDialog,
        WorkflowAcceptDialog,
        WorkflowRejectDialog,
        WorkflowWorkitemsDialog,
    ],
})
export class WorkflowModule {}
