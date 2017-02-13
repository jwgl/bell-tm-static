import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import * as _ from 'lodash';

import {buildKey, createScheduleMap, Schedule, SPANS, Term} from './schedule.model';

@Component({
    selector: 'simple-schedule',
    styleUrls: ['simple-schedule.component.scss'],
    templateUrl: 'simple-schedule.component.html',
})
export class SimpleScheduleComponent implements OnInit {
    readonly spans = SPANS;

    @Input() schedules: Schedule[];
    @Input() size: string;

    @ContentChild('scheduleTpl') scheduleTemplate: TemplateRef<any>;

    days: number[];
    sections: number[];
    map: Array<Array<boolean | Schedule>>;

    hiddenCells: {[key: number]: boolean};
    scheduleMap: _.Dictionary<Schedule[]>;

    ngOnInit() {
        this.sections = _.range(1, 14);
        this.days = _.range(1, 8);
        this.map = new Array(8);
        for (let i = 1; i < this.map.length; i++) {
            this.map[i] = new Array(14);
        }

        this.fillMap();
    }

    cellType(day: number, section: number): 'schedule' | 'normal' | 'hidden' {
        const key = buildKey(day, section);
        if (this.scheduleMap[key]) {
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
        return this.scheduleMap[buildKey(day, section)];
    }

    getScheduleContext(schedule: Schedule, day: number, section: number) {
        return {
            schedule,
            count: this.scheduleMap[buildKey(day, section)].length,
            day,
            section,
        };
    }

    private fillMap(): void {
        this.scheduleMap = createScheduleMap(this.schedules);
        this.hiddenCells = {};
        _.values(this.scheduleMap).forEach(schedules => {
            schedules.forEach(s => {
                for (let i = s.startSection + 1; i < s.startSection + s.totalSection; i++) {
                    this.hiddenCells[buildKey(s.dayOfWeek, i)] = true;
                }
            });
        });
    }
}
