import {Component, OnInit} from '@angular/core';
import {Router, RouteSegment} from '@angular/router';

import {
    Dialog,
    ConfirmDialog,
    WorkflowCommitDialog,
    WorkflowWorkitemsDialog,
} from '../../../../core/dialogs';
import {toVersionString} from '../../../common/utils';
import {VisionViewerComponent} from '../../common/vision-viewer.component';
import {VisionDraftService} from '../draft.service';
import {Vision} from '../../common/vision.model';
import './draft-item.model';

@Component({
    selector: 'vision-draft-item',
    providers: [Dialog],
    template: require('./draft-item.html'),
    directives: [VisionViewerComponent],
})
export class VisionDraftItemComponent implements OnInit {
    id: string;
    vm: Vision;
    workitems: any[];

    constructor(
        private segment: RouteSegment,
        private router: Router,
        private dialog: Dialog,
        private draftService: VisionDraftService) {

        this.id = segment.getParam('id');
    }

    ngOnInit() {
        this.draftService.loadItem(this.id).subscribe(dto => {
            this.vm = new Vision(dto);
            this.vm.editable = dto.editable;
            this.vm.revisable = dto.revisable;
            this.workitems = dto.workitems;
        });
    }

    edit() {
        this.router.navigate([this.id, 'edit']);
    }

    remove() {
        this.dialog.open(ConfirmDialog, {
            title: '删除',
            content: '确定要删除吗？',
        }).then(() => {
            this.draftService.delete(this.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    commit() {
        let what = `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
        this.dialog.open(WorkflowCommitDialog, {
            whoUrl: this.draftService.getCheckerUrl(this.id),
            does: '审核',
            what: what,
        }).then(result => {
            this.draftService.commit(this.id, what, result.to, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    revise() {
        this.router.navigate([this.id, 'revise']);
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: this.vm.workflowInstanceId});
    }
}
