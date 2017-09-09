import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Schedule, ScheduleDto, Timetable} from 'core/models';
import {ReviewOptions} from 'core/workflow';

import {DateRange, FreeListenForm} from '../shared/form.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class FreeListenCheckItemComponent {
    form: FreeListenForm;
    timetable: Timetable;

    private wi: string;
    private prevId: number;
    private nextId: number;
    private dateRange: DateRange;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
        this.form = new FreeListenForm(dto.form, studentSchedules);
        this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        this.dateRange = new DateRange(dto.dateRange);

        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED' && this.dateRange.isValid;
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'check',
            what: this.form.title,
        };
    }
}
