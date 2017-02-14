import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import * as _ from 'lodash';

import {matchOddEven} from 'core/utils';

import {findWeekSchedules, Schedule, Term} from '../../../shared/schedule/schedule.model';
import {Rollcall, RollcallConfig, RollcallForm, RollcallType, Student, ToggleResult} from '../form.model';
import {RollcallFormService} from '../form.service';

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
        private router: Router,
        private route: ActivatedRoute,
        private service: RollcallFormService,
    ) {}

    ngOnInit() {
        this.route.data.subscribe((data: {form: RollcallForm}) => {
            this.rollcallForm = data.form;
        });

        this.route.params.subscribe(params => {
            this.week = parseInt(params['week'], 10);
            this.day = parseInt(params['day'], 10);
            this.section = parseInt(params['section'], 10);
            this.weekSchedules = _.values(findWeekSchedules(this.service.schedules, this.week))
                .map((ss: Schedule[]) => ss[0])
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startSection - b.startSection);

            this.activeSchedule = this.weekSchedules.find(s => s.dayOfWeek === this.day && s.startSection === this.section);
            this.weeks = _.range(this.activeSchedule.startWeek, this.activeSchedule.endWeek + 1)
                          .filter(w => matchOddEven(this.activeSchedule.oddEven, w));
        });
    }

    onSwitchView($event: Event, view: string) {
        const button = $event.target as HTMLElement;
        button.blur();
        this.service.viewType = view;
    }

    toggle(student: Student, type: RollcallType) {
        const result: ToggleResult = student.toggle(type);
        switch (result.op) {
            case 'insert':
                student.pending = true;
                this.service.create({
                    week: this.week,
                    taskScheduleId: student.taskScheduleId,
                    studentId: student.id,
                    type: result.type,
                }).subscribe(id => {
                    student.pending = false;
                    student.rollcall = new Rollcall({id: parseInt(id, 10), studentId: student.id, type: result.type});
                }, error => {
                    student.pending = false;
                    alert(JSON.stringify(error));
                });
                break;
            case 'update':
                student.pending = true;
                this.service.update(student.rollcall.id, {type: result.type}).subscribe(id => {
                    student.pending = false;
                    student.rollcall.type = result.type;
                }, error => {
                    student.pending = false;
                    alert(JSON.stringify(error));
                });
                break;
            case 'delete':
                student.pending = true;
                this.service.delete(student.rollcall.id).subscribe(() => {
                    student.pending = false;
                    student.rollcall = null;
                }, error => {
                    student.pending = false;
                    alert(JSON.stringify(error));
                });
                break;
        }
    }
}
