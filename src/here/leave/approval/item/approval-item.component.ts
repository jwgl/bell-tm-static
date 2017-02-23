import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {ReviewOptions} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {LeaveForm} from '../../shared/form.model';
import {LeaveApprovalService} from '../approval.service';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class LeaveApprovalItemComponent {
    form: LeaveForm;

    private id: string;
    private wi: string;

    constructor(
        private route: ActivatedRoute,
        private service: LeaveApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.service.loadItem(this.id, this.wi).subscribe(dto => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
        this.form = new LeaveForm(dto.form, schedules);
        if (this.wi === undefined) {
            this.wi = dto.form.workitemId;
        }
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }
}
