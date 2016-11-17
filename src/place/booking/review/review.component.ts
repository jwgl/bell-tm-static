import {Component, ElementRef, ViewContainerRef} from '@angular/core';

import {ApiUrl, Rest} from 'core/rest';
import {Workflow} from 'core/workflow';

import {BookingForm} from '../common/form.model';
import './review.model';

@Component({
    selector: 'booking-form-review',
    templateUrl: 'review.component.html',
})
export class BookingReviewComponent {
    id: string;
    wi: string;
    form: BookingForm;

    constructor(
        public viewContainerRef: ViewContainerRef,
        elementRef: ElementRef,
        private workflow: Workflow,
        private rest: Rest,
        public api: ApiUrl) {
        this.id = elementRef.nativeElement.getAttribute('id');
        this.wi = elementRef.nativeElement.getAttribute('wi');
        this.loadData();
    }

    loadData() {
        this.rest.get(this.api.review(this.id, this.wi)).subscribe(dto => {
            this.form = new BookingForm(dto);
            this.form.activity = dto.activity;
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, this.form.activity, this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject() {
        this.workflow.reject(this.id, this.wi, this.form.activity, this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    get reviewable(): boolean {
        return this.form.status === 'SUBMITTED' && this.form.activity === 'check'
            || this.form.status === 'CHECKED' && this.form.activity === 'approve';
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}