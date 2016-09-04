import {Component, ElementRef, OnInit} from '@angular/core';

import {ApiUrl, Rest} from 'core/rest';
import {Workflow} from 'core/workflow';

import {CardReissueForm} from '../common/card-reissue-form.model';

@Component({
    selector: 'card-reissue-review',
    template: require('./review.html'),
})
export class ReissueReviewComponent implements OnInit {
    id: string;
    wi: string;
    vm: CardReissueForm;

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
            this.vm = new CardReissueForm(dto);
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, 'approve', this.vm.title).then(() => {
            this.ngOnInit();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.id, this.wi, 'approve', this.vm.title).then(() => {
            this.ngOnInit();
        }, (error) => {
            alert(error.json().message);
        });
    }

    get reviewable(): boolean {
        return this.vm.status === 'COMMITTED';
    }

    showWorkitems() {
        this.workflow.workitems(this.vm.workflowInstanceId);
    }
}
