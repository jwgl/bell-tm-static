import {Component, ElementRef, OnInit} from '@angular/core';

import {Workflow} from '../../../core/workflow';
import {toVersionString} from '../../common/utils';
import {VisionReviewService} from './review.service';
import {Vision} from '../common/vision.model';
import './review.model';

@Component({
    selector: 'review-vision',
    template: require('./review.html'),
})
export class VisionReviewComponent implements OnInit {
    id: string;
    wi: string;
    vm: Vision;

    constructor(
        elementRef: ElementRef,
        private reviewService: VisionReviewService,
        private workflow: Workflow) {
        this.reviewService.id = elementRef.nativeElement.getAttribute('id');
        this.reviewService.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.reviewService.loadItem().subscribe(dto => {
            this.vm = new Vision(dto);
            this.vm.reviewType = dto.reviewType;
        });
    }

    accept() {
        this.workflow.accept(
            this.vm.reviewType === 'check' ? this.reviewService.getApproversUrl() : null,
            this.vm.reviewType === 'check' ? '审核' : '审批',
            `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`
        ).then(result => {
            this.reviewService.accept(result.what, result.to, result.comment).subscribe(() => {
                this.ngOnInit();
            });
        });
    }

    reject(title: string) {
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
