import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Schedule, ScheduleDto, Timetable} from 'core/models';
import {ReviewOptions} from 'core/workflow';

import {FreeListenForm, FreeListenSettings} from '../shared/form.model';

@Component({
    templateUrl: 'approval-item.component.html',

})
export class FreeListenApprovalItemComponent {
    form: FreeListenForm;
    timetable: Timetable;
    settings: FreeListenSettings;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
        this.form = new FreeListenForm(dto.form, studentSchedules);
        this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        this.settings = new FreeListenSettings(dto.settings);

        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
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
