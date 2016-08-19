import {Component, ElementRef, OnInit} from '@angular/core';

import {Workflow} from '../../../core/workflow';
import {toVersionString} from '../../common/utils';
import {SchemeReviewService} from './review.service';
import {Scheme} from '../common/scheme.model';
import '../common/scheme-viewer.model';
import './review.model';

@Component({
    selector: 'review-scheme',
    template: require('./review.html'),
})
export class SchemeReviewComponent implements OnInit {
    id: string;
    wi: string;
    vm: Scheme;

    constructor(
        elementRef: ElementRef,
        private reviewService: SchemeReviewService,
        private workflow: Workflow) {
        this.reviewService.id = elementRef.nativeElement.getAttribute('id');
        this.reviewService.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.reviewService.loadItem().subscribe(item => {
            this.vm = new Scheme(item);
            this.vm.normalize();
            this.vm.reviewType = item.reviewType;
        });
    }

    accept() {
        this.workflow.accept(
            this.vm.reviewType === 'check' ? this.reviewService.getApproversUrl() : null,
            this.vm.reviewType === 'check' ? '审核' : '审批',
             `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`
        ).then((result: any) => {
            this.reviewService.accept(result.what, result.to, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    reject() {
        this.workflow.reject(
            this.vm.reviewType === 'check' ? '审核' : '审批',
            `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`
        ).then(result => {
            this.reviewService.reject(result.what, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    get reviewable(): boolean {
        return (this.vm.status === 'COMMITTED' && this.vm.reviewType === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.reviewType === 'approve');
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
