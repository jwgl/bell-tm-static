import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Workflow} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {LeaveForm} from '../../shared/form.model';
import {LeaveApprovalService} from '../approval.service';

/**
 * 学生请假审批项。
 */
@Component({
    templateUrl: 'approval-item.component.html',
})
export class LeaveApprovalItemComponent {
    private id: string;
    private wi: string;

    private form: LeaveForm;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private service: LeaveApprovalService,
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
            const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
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

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
