import {Component, OnInit, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import * as _ from 'lodash';

import {RollcallFormService} from '../form.service';
import {RollcallForm, RollcallConfig} from '../form.model';
import {Term, Schedule, findWeekSchedules} from '../../../shared/schedule/schedule.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
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
        this.route.params.mergeMap(params => {
            this.week = parseInt(params['week'], 10);
            this.day = parseInt(params['day'], 10);
            this.section = parseInt(params['section'], 10);
            return this.service.scheduleLoaded;
        }).mergeMap(() => {
            this.weekSchedules = _.values(findWeekSchedules(this.service.schedules, this.week))
                .map((ss: Schedule[]) => ss[0])
                .sort((a, b) => a.dayOfWeek - b.dayOfWeek || a.startSection - b.startSection);

            this.activeSchedule = this.weekSchedules.find(s => s.dayOfWeek === this.day && s.startSection === this.section);
            this.weeks = _.range(this.activeSchedule.startWeek, this.activeSchedule.endWeek + 1)
                          .filter(w => this.activeSchedule.oddEven === 0 ||
                                       this.activeSchedule.oddEven === 1 && w % 2 === 1 ||
                                       this.activeSchedule.oddEven === 2 && w % 2 === 0);

            return this.service.loadDataForCreate({week: this.week, day: this.day, section: this.section});
        }).subscribe(dto => {
            this.rollcallForm = new RollcallForm(dto, this.service.config);
        });
    }

    onChangeSchedule() {
        console.log(this.activeSchedule);
    }
}
