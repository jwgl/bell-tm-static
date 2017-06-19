import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import * as _ from 'lodash';

import {Dialog} from 'core/dialogs';
import {Timeslot} from 'core/models';
import {matchOddEven} from 'core/utils';

import {Rollcall, RollcallForm, RollcallType, Student, ToggleResult} from '../form.model';
import {RollcallFormService} from '../form.service';
import {RollcallSettingsDialog} from './rollcall-settings.dialog';

@Component({
    templateUrl: 'form-editor.component.html',
})
export class RollcallFormEditorComponent implements OnInit {
    rollcallForm: RollcallForm;
    week: number;
    timeslots: Timeslot[];
    timeslot: Timeslot;
    weeks: number[];

    constructor(
        private route: ActivatedRoute,
        private service: RollcallFormService,
        private dialog: Dialog,
    ) {}

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.week = parseInt(params['week'], 10);
            this.timeslots = this.service.timetable.getTimeslots(this.week);
            const timeslotId = parseInt(params['timeslotId'], 10);
            this.timeslot = this.timeslots.find(it => it.id === timeslotId);
            this.weeks = this.timeslot.weeks;
            this.loadData();
        });
    }

    loadData() {
        return this.service.loadRollcalls(this.timeslot.id, this.week).subscribe(dto => {
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
                this.service.create(this.timeslot.id, this.week, {
                    week: this.week,
                    taskScheduleId: student.taskScheduleId,
                    studentId: student.id,
                    type: result.type,
                }).subscribe(res => {
                    student.pending = false;
                    student.rollcall = new Rollcall({id: res.id, studentId: student.id, type: result.type});
                    student.updateAttendances(res.attendances);
                }, error => {
                    student.pending = false;
                });
                break;
            case 'update':
                student.pending = true;
                this.service.update(this.timeslot.id, this.week, student.rollcall.id, {
                    type: result.type,
                }).subscribe(res => {
                    student.pending = false;
                    student.rollcall.type = result.type;
                    student.updateAttendances(res.attendances);
                }, error => {
                    student.pending = false;
                });
                break;
            case 'delete':
                student.pending = true;
                this.service.delete(this.timeslot.id, this.week, student.rollcall.id).subscribe(res => {
                    student.pending = false;
                    student.rollcall = null;
                    student.updateAttendances(res.attendances);
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
