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

    workitems(workflowInstanceId: string) {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: workflowInstanceId});
    }

    typeLabel(type: 'check' | 'approve'): string {
        return type === 'check' ? '审核' : '审批';
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
