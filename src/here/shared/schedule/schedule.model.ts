import * as _ from 'lodash';

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
}

export interface Term {
    startWeek: number;
    endWeek: number;
    currentWeek: number;
}

export function findWeekSchedules(schedules: Schedule[], week: number): _.Dictionary<Schedule[]> {
    return _.chain(schedules)
            .filter(s =>  {
                return week >= s.startWeek && week <= s.endWeek && (
                    s.oddEven === 0 ||
                    s.oddEven === 1 && week % 2 === 1 ||
                    s.oddEven === 2 && week % 2 === 0
                );
            })
            .groupBy(s => this.buildKey(s.dayOfWeek, s.startSection))
            .mapValues((arr: Schedule[]) => _.uniqWith(arr, (a: Schedule, b: Schedule) => {
                return a.startWeek === b.startWeek &&
                    a.endWeek === b.endWeek &&
                    a.oddEven === b.oddEven &&
                    a.course === b.course &&
                    a.courseItem === b.courseItem &&
                    a.place === b.place;
            }))
            .value();
}

export function buildKey(day: number, section: number): number {
    return day * 100 + section;
}
