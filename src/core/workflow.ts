import {NgModule, Injectable} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {Rest, ApiUrl} from './rest';

import {Dialog} from './dialogs';
import {CommonDirectivesModule} from './common-directives';
import {WorkflowSubmitDialog} from './workflow/submit.dialog';
import {WorkflowAcceptDialog} from './workflow/accept.dialog';
import {WorkflowRejectDialog} from './workflow/reject.dialog';
import {WorkflowWorkitemsDialog} from './workflow/workitems.dialog';
import {WorkitemStatusComponent} from './workflow/workitem-status.component';

@Injectable()
export class Workflow {
    constructor(private dialog: Dialog, private rest: Rest, private api: ApiUrl) {}

    submit(id: any, what: string): Promise<void> {
        const whoUrl = this.api.reviewers(id, 'check');
        const does = '审核';
        return this.dialog.open(WorkflowSubmitDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.submit(id), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    accept(id: any, wi: string, type: string, what: string): Promise<void> {
        const whoUrl = type === 'check' ? this.api.reviewers(id, 'approve') : null;
        const does = type === 'check' ? '审核' : '审批';
        return this.dialog.open(WorkflowAcceptDialog, {whoUrl, does, what}).then(result => {
            return this.rest.patch(this.api.accept(id, wi), {title: result.what, to: result.to, comment: result.comment}).toPromise();
        });
    }

    reject(id: any, wi: string, type: string, what: string): Promise<void> {
        const does = type === 'check' ? '审核' : '审批';
        return this.dialog.open(WorkflowRejectDialog, {does, what}).then(result => {
            return this.rest.patch(this.api.reject(id, wi), {title: result.what, comment: result.comment}).toPromise();
        });
    }

    workitems(workflowInstanceId: string) {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: workflowInstanceId});
    }
}

const WORKFLOW_DIALOGS: any[] = [
    WorkflowSubmitDialog,
    WorkflowAcceptDialog,
    WorkflowRejectDialog,
    WorkflowWorkitemsDialog,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        WORKFLOW_DIALOGS,
        WorkitemStatusComponent,
    ],
    providers: [
        Dialog,
        Workflow,
    ],
    exports: [
        WORKFLOW_DIALOGS,
    ],
    entryComponents: [
        WORKFLOW_DIALOGS,
    ],
})
export class WorkflowModule {}
