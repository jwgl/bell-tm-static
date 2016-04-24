import {Component, ElementRef, OnInit} from 'angular2/core';

import {
    Dialog,
    WorkflowRejectDialog,
    WorkflowCommitDialog,
    WorkflowWorkitemsDialog,
} from '../../../core/dialogs';
import {toVersionString} from '../../common/utils';
import {SchemeViewerComponent} from '../common/scheme-viewer.component';
import {SchemeReviewService} from './review.service';
import {Scheme} from '../common/scheme.model';
import '../common/scheme-viewer.model';
import './review.model';

@Component({
    selector: 'review-scheme',
    providers: [Dialog],
    template: require('./review.html'),
    directives: [SchemeViewerComponent],
})
export class SchemeReviewComponent implements OnInit {
    id: string;
    wi: string;
    vm: Scheme;
    workitems: any[];

    constructor(
        public elementRef: ElementRef,
        private reviewService: SchemeReviewService,
        private dialog: Dialog) {
        this.reviewService.id = elementRef.nativeElement.getAttribute('id');
        this.reviewService.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.reviewService.loadItem().subscribe(item => {
            this.vm = new Scheme(item);
            this.vm.normalize();
            this.vm.reviewType = item.reviewType;
            this.workitems = item.workitems;
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

    reject() {
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
