import {Component, ElementRef, OnInit} from 'angular2/core';

import {
    Dialog,
    WorkflowRejectDialog,
    WorkflowCommitDialog,
    WorkflowWorkitemsDialog,
} from '../../../core/dialogs';
import {toVersionString} from '../../common/utils';
import {VisionViewerComponent} from '../common/vision-viewer.component';
import {VisionReviewService} from './review.service';
import {Vision} from '../common/vision.model';
import './review.model';

@Component({
    selector: 'review-vision',
    providers: [Dialog],
    template: require('./review.html'),
    directives: [VisionViewerComponent],
})
export class VisionReviewComponent implements OnInit {
    id: string;
    wi: string;
    vm: Vision;
    workitems: any[];

    constructor(
        public elementRef: ElementRef,
        private reviewService: VisionReviewService,
        private dialog: Dialog) {
        this.reviewService.id = elementRef.nativeElement.getAttribute('id');
        this.reviewService.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.reviewService.loadItem().subscribe(dto => {
            this.vm = new Vision(dto);
            this.vm.reviewType = dto.reviewType;
            this.workitems = dto.workitems;
        });
    }

    accept() {
        let what = `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
        this.dialog.open(WorkflowCommitDialog, {
            whoUrl: this.vm.reviewType === 'check' ? this.reviewService.getApproversUrl() : null,
            does: '审批',
            what: what,
        }).then((result: any) => {
            this.reviewService.accept(what, result.to, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    reject(title: string) {
        let what = `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
        this.dialog.open(WorkflowRejectDialog, {
            does: this.vm.reviewType === 'check' ? '审核' : '审批',
            what: what,
        }).then(comment => {
            this.reviewService.reject(what, comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    get reviewable(): boolean {
        return (this.vm.status === 'COMMITTED' && this.vm.reviewType === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.reviewType === 'approve');
    }

    showWorkitems() {
        this.dialog.open(WorkflowWorkitemsDialog, {instance: this.vm.workflowInstanceId});
    }
}
