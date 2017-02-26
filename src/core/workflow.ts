import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

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

import {WorkflowItemResolve} from './workflow/item.resolve';
import {WorkflowListResolve} from './workflow/list.resolve';

import {ListGroupComponent} from './workflow/list-group.component';
import {NavTabsComponent} from './workflow/nav-tabs.component';

export {
    ReviewOptions,
    RevokeOptions,
    SubmitOptions,
    Workflow,
    WorkflowItemResolve,
    WorkflowListResolve,
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
    WorkflowRevokeButton,
    WorkflowWorkitemsButton,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        CommonDirectivesModule,
    ],
    declarations: [
        WORKFLOW_DIALOGS,
        WORKFLOW_BUTTONS,
        WorkitemStatusComponent,
        ListGroupComponent,
        NavTabsComponent,
    ],
    providers: [
        Dialog,
        Workflow,
        WorkflowItemResolve,
        WorkflowListResolve,
    ],
    exports: [
        WORKFLOW_BUTTONS,
        ListGroupComponent,
        NavTabsComponent,
    ],
    entryComponents: [
        WORKFLOW_DIALOGS,
    ],
})
export class WorkflowModule {}
