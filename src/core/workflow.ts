import {NgModule, Injectable, Inject, OpaqueToken} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {ModalDirectivesModule} from './directives';
import {WorkflowCommitDialog} from './workflow/commit.dialog';
import {WorkflowAcceptDialog} from './workflow/accept.dialog';
import {WorkflowRejectDialog} from './workflow/reject.dialog';
import {WorkflowWorkitemsDialog} from './workflow/workitems.dialog';
import {Dialog, provideDialog} from './dialogs';

 const WORKFLOW_DIALOG = new OpaqueToken('Workflow Dialog');

@Injectable()
export class Workflow {
    constructor(@Inject(WORKFLOW_DIALOG)private dialog: Dialog) {}

    commit(options: {whoUrl: string, does: string, what: string}): Promise<{what: string, to: string, comment: string}> {
        return this.dialog.open(WorkflowCommitDialog, options);

    }

    accept(whoUrl: string, does: string, what: string): Promise<{what: string, to: string, comment: string}> {
        return this.dialog.open(WorkflowAcceptDialog, {whoUrl, does, what});
    }

    reject(does: string, what: string): Promise<{what: string, comment: string}> {
        return this.dialog.open(WorkflowRejectDialog, {does, what});
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
