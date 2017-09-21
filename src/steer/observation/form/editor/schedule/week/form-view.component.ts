import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'lodash';
import * as moment from 'moment';

import 'rxjs/add/operator/switchMap';

import { Schedule, ScheduleDto, Timetable } from 'core/models';
import './form-view.model';

import { WeekScheduleMode } from '../../../shared/schedule-mode.model';
import { ScheduleService } from '../schedule.service';

@Component({
    selector: 'week-schedule',
    styleUrls: ['form-view.component.scss'],
    templateUrl: 'form-view.component.html',
})
export class WeekScheduleComponent {
    timetable: Timetable;
    teacher: any;
    place: any;
    term: any;

    private scheduleMode: WeekScheduleMode;

    constructor(
        private service: ScheduleService,
        private route: ActivatedRoute) {
        this.scheduleMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        this.service.getTerm().subscribe(dto => {
            this.loadData(dto);
            if (params['teacherId']) {
                this.teacher = { id: params['teacherId'] };
                this.queryTeacher();
            }
        });
    }

    loadData(dto: any) {
        this.term = dto;
    }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    onPlaceSelected(place: any): void {
        this.place = place;
    }

    query() {
        if (this.isTeacherMode) {
            this.queryTeacher();
        } else {
            this.queryPlace();
        }
    }

    queryTeacher() {
        this.service.findTeacherSchedule(this.teacher.id).subscribe(result => {
            const schedules = result.map((dto: any) => {
                const schedule = new Schedule(dto);
                schedule.superviseCount = dto.superviseCount;
                schedule.academicTitle = dto.academicTitle;
                schedule.department = dto.department;
                schedule.property = dto.property;
                return schedule;
            });
            if (this.timetable) {
                const week = this.timetable.week;
                this.timetable = new Timetable(schedules, true);
                this.timetable.week = week;
            } else {
                this.timetable = new Timetable(schedules, true);
            }
        });
    }

    queryPlace() {
        this.service.findPlaceSchedule(this.place ? this.place.id : null).subscribe(result => {
            const schedules = result.map((dto: any) => {
                const schedule = new Schedule(dto);
                schedule.superviseCount = dto.superviseCount;
                schedule.academicTitle = dto.academicTitle;
                schedule.department = dto.department;
                return schedule;
            });
            this.timetable = new Timetable(schedules, true);
        });
    }

    get title(): string {
        return this.scheduleMode === WeekScheduleMode.Teacher ? '教师周课表查询' : '上课地点周课表查询';
    }

    get isTeacherMode(): boolean {
        return this.scheduleMode === WeekScheduleMode.Teacher;
    }
}
