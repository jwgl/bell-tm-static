import {Component, OnInit, Input, Output, ContentChild, TemplateRef, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

import {Term, Schedule, findWeekSchedules, buildKey} from './schedule.model';

@Component({
    selector: 'here-schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html',
})
export class HereScheduleComponent implements OnInit {
    readonly spans = {
        1  : {span: 4, label: '上午'},
        5  : {span: 5, label: '下午'},
        10 : {span: 4, label: '晚上'},
    };

    @Input() term: Term;
    @Input() schedules: Schedule[];
    @Input() selectable = false;
    @Input() size: string;

    @ContentChild('scheduleTpl') scheduleTemplate: TemplateRef<any>;
    @ContentChild('dayOfWeekTpl') dayOfWeekTemplate: TemplateRef<any>;
    @ContentChild('weekTpl') weekTemplate: TemplateRef<any>;
    @ContentChild('weekTabTpl') weekTabTemplate: TemplateRef<any>;

    days: number[];
    sections: number[];
    weeks: number[];
    _currentWeek: number;
    map: (boolean | Schedule)[][];

    hiddenCells: {[key: number]: boolean};
    weekSchedules: _.Dictionary<Schedule[]>;

    ngOnInit() {
        this.sections = _.range(1, 14);
        this.days = _.range(1, 8);
        this.map = new Array(8);
        for (let i = 1; i < this.map.length; i++) {
            this.map[i] = new Array(14);
        }

        this.weeks = _.range(this.term.startWeek, this.term.endWeek + 1);
        this.currentWeek = this.term.currentWeek;
    }

    set currentWeek(week: number) {
        this._currentWeek = week;
        this.fillMap();
    }

    get currentWeek(): number {
        return this._currentWeek;
    }

    cellType(day: number, section: number): 'schedule' | 'normal' | 'hidden' {
        let key = buildKey(day, section);
        if (this.weekSchedules[key]) {
            return 'schedule';
        } else if (this.hiddenCells[key]) {
            return 'hidden';
        } else {
            return 'normal';
        }
    }

    getRowSpan(day: number, section: number): number {
        return this.getScheduleCell(day, section)[0].totalSection;
    }

    getScheduleCell(day: number, section: number): Schedule[] {
        return this.weekSchedules[buildKey(day, section)];
    }

    getScheduleContext(schedule: Schedule, day: number, section: number) {
        return {
            schedule: schedule,
            count: this.weekSchedules[buildKey(day, section)].length,
            week: this.currentWeek,
            day: day,
            section: section,
        };
    }

    private fillMap(): void {
        this.weekSchedules = findWeekSchedules(this.schedules, this.currentWeek);

        this.hiddenCells = {};
        _.values(this.weekSchedules).forEach(schedules => {
            schedules.forEach(s => {
                for (let i = s.startSection + 1; i < s.startSection + s.totalSection; i++) {
                    this.hiddenCells[buildKey(s.dayOfWeek, i)] = true;
                }
            });
        });
    }
}
