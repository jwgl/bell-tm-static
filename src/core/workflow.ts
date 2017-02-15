import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import 'rxjs/add/operator/toPromise';

import {CommonDirectivesModule} from './common-directives';
import {Dialog} from './dialogs';
import {WorkflowAcceptDialog} from './workflow/accept.dialog';
import {WorkflowRejectDialog} from './workflow/reject.dialog';
import {WorkflowRevokeDialog} from './workflow/revoke.dialog';
import {WorkflowSubmitDialog} from './workflow/submit.dialog';
import {Workflow} from './workflow/workflow.service';
import {WorkitemStatusComponent} from './workflow/workitem-status.component';
import {WorkflowWorkitemsDialog} from './workflow/workitems.dialog';

export {Workflow}

const WORKFLOW_DIALOGS: any[] = [
    WorkflowSubmitDialog,
    WorkflowAcceptDialog,
    WorkflowRejectDialog,
    WorkflowRevokeDialog,
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
