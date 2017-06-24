import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Schedule, ScheduleDto} from 'core/models';
import {ReviewOptions} from 'core/workflow';

import {LeaveForm} from '../shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class LeaveApprovalItemComponent {
    form: LeaveForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
        this.form = new LeaveForm(dto.form, schedules);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }
}
