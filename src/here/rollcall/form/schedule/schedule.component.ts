import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';

import {RollcallFormService} from '../form.service';

interface Schedule {
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    place: string;
    courseItem: string;
    scheduleId: string;
}

@Component({
    selector: 'rollcall-schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html',
})
export class RollcallScheduleComponent implements OnInit {
    spans: any;
    days: number[];
    sections: number[];
    weeks: number[];
    currentWeek: number;
    term: {startWeek: number, endWeek: number, currentNumber: number};
    schedules: Schedule[];

    map: (boolean | Schedule)[][];

    constructor(
        private service: RollcallFormService,
    ) {}

    ngOnInit() {
        this.spans = {
            1  : {span: 4, label: '上午'},
            5  : {span: 5, label: '下午'},
            10 : {span: 4, label: '晚上'},
        };
        this.sections = _.range(1, 14);
        this.days = _.range(1, 8);
        this.map = new Array(8);
        for (let i = 1; i < this.map.length; i++) {
            this.map[i] = new Array(14);
            for (let j = 1; j < this.map[i].length; j++)  {
                this.map[i][j] = true;
            }
        }

        this.service.scheduleLoaded.subscribe(v => {
            let term = this.service.term;
            this.weeks = _.range(term.startWeek, term.endWeek + 1);
            this.currentWeek = term.currentWeek;
            this.schedules = this.service.schedules;
            this.fillMap();
        });
    }

    fillMap() {
        this.schedules.forEach(s => {
            this.map[s.dayOfWeek][s.startSection] = s;
            for (let i = s.startSection + 1; i < s.startSection + s.totalSection; i++) {
                this.map[s.dayOfWeek][i] = false;
            }
        });
    }

    get viewType(): string {
        return this.service.config.view ? this.service.config.view : 'detail';
    }
}
