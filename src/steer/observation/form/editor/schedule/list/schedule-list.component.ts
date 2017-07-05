import { Component } from '@angular/core';

import * as _ from 'lodash';
import * as moment from 'moment';

import { Dialog } from 'core/dialogs';
import { Schedule } from 'core/models';

import { ScheduleService } from '../schedule.service';

import { QueryOptionDialog } from './query-option.dialog';
import './schedule.model';

@Component({
    selector: 'schedule-list',
    styleUrls: ['schedule-list.component.scss'],
    templateUrl: 'schedule-list.component.html',
})
export class ScheduleListComponent {
    queryOptions: any = {};
    schedules: Schedule[];

    constructor(
        private service: ScheduleService,
        private dialog: Dialog,
    ) {}

    valueFn = (item: any) => item.value;
    labelFn = (item: any) => item.label;

    findSchedule() {
        let place = this.queryOptions.building;
        if (this.queryOptions.place.name && this.queryOptions.place.name !== undefined) { place = this.queryOptions.place.name; }
        this.service.loadList({
            teacherId: this.queryOptions.teacher.id,
            place: !place ? null : place,
            departmentId: this.queryOptions.departmentId,
            weekOfTerm: this.queryOptions.weekOfTerm,
            dayOfWeek: this.queryOptions.dayOfWeek,
            startSection: this.queryOptions.section.start,
            endSection: this.queryOptions.section.start + this.queryOptions.section.total - 1,
        }).subscribe(result => {
            this.schedules = result.map((dto: any) => {
                const schedule = new Schedule(dto);
                schedule.superviseCount = dto.superviseCount;
                schedule.academicTitle = dto.academicTitle;
                schedule.department = dto.department;
                schedule.credit = dto.credit;
                return schedule;
            });
            this.schedules = _.uniqWith(this.schedules, (a: Schedule, b: Schedule) => a.uniqueCompare(b))
            .sort((a, b) => a.compare(b));
        });
    }

    query() {
        const title = '课表高级查询';
        this.dialog.open(QueryOptionDialog, { title }).then(result => {
            this.queryOptions = result;
            this.findSchedule();
        });
    }
}
