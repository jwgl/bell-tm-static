import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {CommonDirectivesModule} from './common-directives';
import {Dialog} from './dialogs';
import {WorkflowAcceptButton} from './workflow/accept.button';
import {WorkflowAcceptDialog} from './workflow/accept.dialog';
import {WorkflowRejectButton} from './workflow/reject.button';
import {WorkflowRejectDialog} from './workflow/reject.dialog';
import {WorkflowRevokeButton} from './workflow/revoke.button';
import {WorkflowRevokeDialog} from './workflow/revoke.dialog';
import {WorkflowSubmitButton} from './workflow/submit.button';
import {WorkflowSubmitDialog} from './workflow/submit.dialog';
import {
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow,
} from './workflow/workflow.service';
import {WorkitemStatusComponent} from './workflow/workitem-status.component';
import {WorkflowWorkitemsButton} from './workflow/workitems.button';
import {WorkflowWorkitemsDialog} from './workflow/workitems.dialog';

export {
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow
}

const WORKFLOW_DIALOGS: any[] = [
    WorkflowSubmitDialog,
    WorkflowAcceptDialog,
    WorkflowRejectDialog,
    WorkflowRevokeDialog,
    WorkflowWorkitemsDialog,
];

const WORKFLOW_BUTTONS: any[] = [
    WorkflowAcceptButton,
    WorkflowRejectButton,
    WorkflowSubmitButton,
    WorkflowWorkitemsButton,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CommonDirectivesModule,
    ],
    declarations: [
        WORKFLOW_DIALOGS,
        WORKFLOW_BUTTONS,
        WorkitemStatusComponent,
    ],
    providers: [
        Dialog,
        Workflow,
    ],
    exports: [
        WORKFLOW_BUTTONS,
    ],
    entryComponents: [
        WORKFLOW_DIALOGS,
    ],
})
export class WorkflowModule {}
