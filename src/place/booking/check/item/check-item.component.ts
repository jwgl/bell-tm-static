import {Component, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Workflow} from 'core/workflow';

import {BookingForm} from '../../shared/form.model';
import './check-item.model';
import {BookingCheckService} from '../check.service';

/**
 * 审核补办学生证申请项。
 */
@Component({
    templateUrl: 'check-item.component.html',

})
export class BookingCheckItemComponent {
    private id: string;
    private wi: string;

    private form: BookingForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        elementRef: ElementRef,
        private service: BookingCheckService,
        private workflow: Workflow,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.loadData();
        });
    }

    loadData() {
        this.service.loadItem(this.id, this.wi).subscribe(dto => {
            this.form = new BookingForm(dto);
            this.form.activity = dto.activity;
            if (this.wi === undefined) {
                this.wi = dto.workitemId;
            }
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, 'check', this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.form.id, this.wi, 'check', this.form.title).then(() => {
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
