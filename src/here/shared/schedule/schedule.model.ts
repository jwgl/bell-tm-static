import * as _ from 'lodash';

import {matchOddEven} from 'core/utils';

export interface ScheduleDto {
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

export class Schedule {
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    courseItem: string;
    place: string;
    scheduleId: string;

    constructor(dto: ScheduleDto) {
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.oddEven = dto.oddEven;
        this.dayOfWeek = dto.dayOfWeek;
        this.startSection = dto.startSection;
        this.totalSection = dto.totalSection;
        this.course = dto.course;
        this.courseItem = dto.courseItem;
        this.place = dto.place;
        this.scheduleId = dto.scheduleId;
    }

    get label(): string {
        const days = ' 一二三四五六日';
        let sections = this.totalSection === 1
            ? `第${this.startSection}`
            : `${this.startSection}-${this.startSection + this.totalSection - 1}`;
        let courseItem = this.courseItem ? `【${this.courseItem}】` : '';
        return `周${days[this.dayOfWeek]} ${sections}节 ${this.course}${courseItem}`;
    }

    uniqueCompare(other: Schedule): boolean {
        return this.startWeek === other.startWeek &&
               this.endWeek === other.endWeek &&
               this.oddEven === other.oddEven &&
               this.course === other.course &&
               this.courseItem === other.courseItem &&
               this.place === other.place;
    }
}

export interface Term {
    startWeek: number;
    endWeek: number;
    currentWeek: number;
}

export function findWeekSchedules(schedules: Schedule[], week: number): _.Dictionary<Schedule[]> {
    return _.chain(schedules)
            .filter(s => week >= s.startWeek && week <= s.endWeek && matchOddEven(s.oddEven, week))
            .groupBy(s => this.buildKey(s.dayOfWeek, s.startSection))
            .mapValues((ss: Schedule[]) => _.uniqWith(ss, (a: Schedule, b: Schedule) => a.uniqueCompare(b)))
            .value();
}

export function buildKey(day: number, section: number): number {
    return day * 100 + section;
}
