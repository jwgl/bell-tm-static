import {Component, ElementRef, OnInit} from '@angular/core';

import {ApiUrl, Rest} from '../../../core/http';
import {Workflow} from '../../../core/workflow';
import {toVersionString} from '../../common/utils';
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
        private workflow: Workflow,
        private rest: Rest,
        public api: ApiUrl) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.wi = elementRef.nativeElement.getAttribute('wi');
    }

    ngOnInit() {
        this.rest.get(this.api.review(this.id, this.wi)).subscribe(item => {
            this.vm = new Scheme(item);
            this.vm.normalize();
            this.vm.reviewType = item.reviewType;
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, this.vm.reviewType, this.title).then(() => {
            this.ngOnInit();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject() {
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
