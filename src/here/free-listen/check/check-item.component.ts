import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

import {ReviewOptions} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../shared/schedule/schedule.model';
import {FreeListenForm} from '../shared/form.model';

import '../shared/form-viewer.model';

@Component({
    templateUrl: 'check-item.component.html',
})
export class FreeListenCheckItemComponent {
    schedules: Schedule[];
    form: FreeListenForm;

    private wi: string;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s));

        this.form = new FreeListenForm(dto.form, studentSchedules);
        if (this.wi === undefined) {
            this.wi = dto.workitemId;
        }

        studentSchedules.forEach(it => it.belongsTo = 'student');
        departmentSchedules.forEach(it => it.belongsTo = 'department');
        this.schedules = _.concat(studentSchedules, departmentSchedules);
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
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
