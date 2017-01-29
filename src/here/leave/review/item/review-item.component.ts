import {Component, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {Workflow} from 'core/workflow';

import {LeaveReviewService} from '../review.service';
import {LeaveForm} from '../../shared/form.model';
import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';

/**
 * 学生请假审批项。
 */
@Component({
    templateUrl: 'review-item.component.html',
})
export class LeaveReviewItemComponent {
    private id: string;
    private wi: string;

    private form: LeaveForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        elementRef: ElementRef,
        private service: LeaveReviewService,
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
            let schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
            this.form = new LeaveForm(dto.form, schedules);
            if (this.wi === undefined) {
                this.wi = dto.form.workitemId;
            }
        });
    }

    accept() {
        this.workflow.accept(this.id, this.wi, 'approve', this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    reject(title: string) {
        this.workflow.reject(this.form.id, this.wi, 'approve', this.form.title).then(() => {
            this.loadData();
        }, (error) => {
            alert(error.json().message);
        });
    }

    get reviewable(): boolean {
        console.log(this.form.status)
        console.log(this.wi)
        return this.form.status === 'SUBMITTED' && this.wi !== undefined;
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
