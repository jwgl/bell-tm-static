import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {Dialog} from 'core/dialogs';
import {matchOddEven} from 'core/utils';

import {findWeekSchedules, Schedule, Term} from '../../../shared/schedule/schedule.model';
import {Rollcall, RollcallForm, RollcallType, Student, ToggleResult} from '../form.model';
import {RollcallFormService} from '../form.service';
import {RollcallSettingsDialog} from './rollcall-settings.dialog';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class RollcallFormEditorComponent implements OnInit {
    rollcallForm: RollcallForm;
    week: number;
    day: number;
    section: number;
    weekSchedules: Schedule[];
    activeSchedule: Schedule;
    weeks: number[];

    constructor(
        private route: ActivatedRoute,
        private service: RollcallFormService,
        private dialog: Dialog,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            const week = parseInt(params['week'], 10);
            const day = parseInt(params['day'], 10);
            const section = parseInt(params['section'], 10);

            this.week = week;
            this.day = day;
            this.section = section;

            this.weekSchedules = _.values(findWeekSchedules(this.service.schedules, this.week))
                .map((ss: Schedule[]) => ss[0]);

            this.activeSchedule = this.weekSchedules.find(s => s.dayOfWeek === this.day && s.startSection === this.section);
            this.weeks = _.range(this.activeSchedule.startWeek, this.activeSchedule.endWeek + 1)
                          .filter(w => matchOddEven(this.activeSchedule.oddEven, w));
            this.loadData();
        });
    }

    loadData() {
        return this.service.loadRollcalls(this.week, this.day, this.section).subscribe(dto => {
            this.rollcallForm = new RollcallForm(dto, this.service.settings);
        });
    }

    onSwitchView($event: Event, view: string) {
        const button = $event.target as HTMLElement;
        this.service.updateViewType(view).subscribe(() => {
            button.blur();
        });
    }

    toggle(student: Student, type: RollcallType) {
        const result: ToggleResult = student.toggle(type);
        switch (result.op) {
            case 'insert':
                student.pending = true;
                this.service.create(this.week, this.day, this.section, {
                    week: this.week,
                    taskScheduleId: student.taskScheduleId,
                    studentId: student.id,
                    type: result.type,
                }).subscribe(res => {
                    student.pending = false;
                    student.rollcall = new Rollcall({id: res.id, studentId: student.id, type});
                    student.attendances = res.attendances;
                }, error => {
                    student.pending = false;
                });
                break;
            case 'update':
                student.pending = true;
                this.service.update(this.week, this.day, this.section, student.rollcall.id, {
                    type: result.type,
                }).subscribe(res => {
                    student.pending = false;
                    student.rollcall.type = type;
                    student.attendances = res.attendances;
                }, error => {
                    student.pending = false;
                });
                break;
            case 'delete':
                student.pending = true;
                this.service.delete(this.week, this.day, this.section, student.rollcall.id).subscribe(res => {
                    student.pending = false;
                    student.rollcall = null;
                    student.attendances = res.attendances;
                }, error => {
                    student.pending = false;
                });
                break;
        }
    }

    showSettingsDialog() {
        this.dialog.open(RollcallSettingsDialog, this.rollcallForm.settings).then(result => {
            this.service.updateSettings(result).subscribe(() => {
                this.rollcallForm.applySettings();
            });
        });
    }
}
