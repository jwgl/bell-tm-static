import {Component, ElementRef, OnInit} from '@angular/core';

import {ApiUrl, Rest} from '../../../core/http';
import {Workflow} from '../../../core/workflow';
import {toVersionString} from '../../common/utils';
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
        private workflow: Workflow,
        private rest: Rest,
        private api: ApiUrl) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.rest.get(this.api.review(this.id, this.wi)).subscribe(dto => {
            this.vm = new Vision(dto);
            this.vm.reviewType = dto.reviewType;
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, this.vm.reviewType, this.title).then(() => {
            this.ngOnInit();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.id, this.wi, this.vm.reviewType, this.title).then(() => {
            this.ngOnInit();
        }, (error) => {
            alert(error.json().message);
        });
    }

    get reviewable(): boolean {
        return (this.vm.status === 'COMMITTED' && this.vm.reviewType === 'check')
            || (this.vm.status === 'CHECKED' && this.vm.reviewType === 'approve');
    }

    get title(): string {
        return `${this.vm.title}（${toVersionString(this.vm.versionNumber)}）`;
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
