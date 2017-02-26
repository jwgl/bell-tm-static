import * as _ from 'lodash';

import {
    dayOfWeekText,
    matchOddEven,
    sectionRangeText,
    weekRangeText,
} from 'core/utils';

export const SPANS = {
    1  : {span: 4, label: '上午'},
    5  : {span: 5, label: '下午'},
    10 : {span: 4, label: '晚上'},
};

export interface ScheduleDto {
    id: string;
    taskId: string;
    courseClassId: string;
    courseClassName: string;
    courseTeacherId: string;
    courseTeacherName: string;
    teacherId: string;
    teacherName: string;
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    place: string;
    courseItem: string;
}

export class Schedule {
    id: string;
    taskId: string;
    courseClassId: string;
    courseClassName: string;
    courseTeacherId: string;
    courseTeacherName: string;
    teacherId: string;
    teacherName: string;
    startWeek: number;
    endWeek: number;
    oddEven: number;
    dayOfWeek: number;
    startSection: number;
    totalSection: number;
    course: string;
    courseItem: string;
    place: string;

    constructor(dto: ScheduleDto) {
        this.id = dto.id;
        this.taskId = dto.taskId;
        this.courseClassId = dto.courseClassId;
        this.courseClassName = dto.courseClassName;
        this.courseTeacherId = dto.courseTeacherId;
        this.courseTeacherName = dto.courseTeacherName;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.oddEven = dto.oddEven;
        this.dayOfWeek = dto.dayOfWeek;
        this.startSection = dto.startSection;
        this.totalSection = dto.totalSection;
        this.course = dto.course;
        this.courseItem = dto.courseItem;
        this.place = dto.place;
    }

    get label(): string {
        return `${this.dayOfWeekLabel} ${this.sectionsLabel} ${this.courseLabel}`;
    }

    get weeksLabel(): string {
        return weekRangeText(this);
    }

    get dayOfWeekLabel(): string {
        return `周${dayOfWeekText(this.dayOfWeek)}`;
    }

    get sectionsLabel(): string {
        return sectionRangeText(this);
    }

    get courseLabel(): string {
        return this.courseItem
            ? `${this.course}【${this.courseItem}】`
            : this.course;
    }

    uniqueCompare(other: Schedule): boolean {
        return this.startWeek === other.startWeek &&
               this.endWeek === other.endWeek &&
               this.oddEven === other.oddEven &&
               this.course === other.course &&
               this.courseItem === other.courseItem &&
               this.place === other.place;
    }

    compare(other: Schedule): number {
        return this.startWeek - other.startWeek
             || this.endWeek - other.endWeek
             || this.oddEven - other.oddEven
             || this.course.localeCompare(other.course)
             || this.course.localeCompare(other.courseItem)
             || this.place.localeCompare(other.place);
    }
}

export interface Term {
    startWeek: number;
    endWeek: number;
    currentWeek: number;
}

function uniqueAndSort(schedules: Schedule[]): Schedule[] {
    return _.uniqWith(schedules, (a: Schedule, b: Schedule) => a.uniqueCompare(b))
            .sort((a, b) => a.compare(b));
}

export function findWeekSchedules(schedules: Schedule[], week: number): _.Dictionary<Schedule[]> {
    return _.chain(schedules)
            .filter(s => week >= s.startWeek && week <= s.endWeek && matchOddEven(s.oddEven, week))
            .groupBy(s => this.buildKey(s.dayOfWeek, s.startSection))
            .mapValues((ss: Schedule[]) => uniqueAndSort(ss))
            .value();
}

export function createScheduleMap(schedules: Schedule[]): _.Dictionary<Schedule[]> {
    return _.chain(schedules)
            .groupBy(s => this.buildKey(s.dayOfWeek, s.startSection))
            .mapValues((ss: Schedule[]) => uniqueAndSort(ss))
            .value();
}

export function buildKey(day: number, section: number): number {
    return day * 100 + section;
}
