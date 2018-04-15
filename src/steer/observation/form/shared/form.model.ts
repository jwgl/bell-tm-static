import * as _ from 'lodash';
import * as moment from 'moment';

import { Schedule, Timeslot, TimeslotItem } from 'core/components/schedule-timetable/schedule-timetable.model';
import { dayOfWeekText, weekRangeText } from 'core/utils';

declare module 'core/components/schedule-timetable/schedule-timetable.model' {
    interface Schedule {
        academicTitle: string;
        credit: number;
        property: string;
        studentCount: number;
        department: string;
        dayOfWeek: number;
        hasError: string;
    }
}

export interface EvaluationMap {
    [key: string]: EvaluationItem[];
}

interface Observer {
    roleId: number;
    roleName: string;
    teacherId: string;
    tercherName: string;
}

export interface Observers {
    key: number;
    value: Observer[];
}

export const GRADES: any[] = [
    {name: '5', value: 5},
    {name: '4', value: 4},
    {name: '3', value: 3},
    {name: '2', value: 2},
    {name: '1', value: 1},
    {name: '0', value: 0},
];

export const scheduleSectionMap: { [key: number]: ScheduleSection } = {};

export class ObservationForm {
    schedule: Schedule;
    id: any;
    teacherId: string;
    teacherName: string;
    observationWeek: number;
    totalSection: number;
    teachingMethods: string;
    supervisorDate: string;
    observerType: number;
    place: string;
    earlier: number;
    late: number;
    leave: number;
    dueStds: number;
    attendantStds: number;
    lateStds: number;
    leaveStds: number;
    evaluateLevel: number;
    evaluations: any;
    evaluationText: string;
    suggest: string;
    status: number;
    observerId: string;
    isActive: boolean;
    isScheduleTemp: boolean;

    constructor(dto: any) {
        if (dto.timeslot) {
            this.schedule = this.concatSchedules(dto.timeslot);
        }
        this.id = dto.id;
        this.teacherId = dto.teacherId;
        this.teacherName = dto.teacherName;
        this.observationWeek = dto.observationWeek;
        this.totalSection = dto.totalSection;
        this.teachingMethods = dto.teachingMethods;
        this.supervisorDate = dto.supervisorDate;
        this.observerType = dto.observerType;
        this.place = dto.place;
        this.earlier = dto.earlier;
        this.late = dto.late;
        this.leave = dto.leave;
        this.dueStds = dto.dueStds;
        this.attendantStds = dto.attendantStds;
        this.lateStds = dto.lateStds;
        this.leaveStds = dto.leaveStds;
        this.evaluateLevel = dto.evaluateLevel;
        this.evaluations = dto.evaluations;
        this.evaluationText = dto.evaluationText;
        this.suggest = dto.suggest;
        this.status = dto.status;
        this.observerId = dto.observerId;
        this.isActive = dto.isActive;
        this.isScheduleTemp = dto.isScheduleTemp;
    }

    concatSchedules(ss: any[]): any {
        const schedules: Schedule[] = ss.map((item: any) => {
            const schedule = new Schedule(item);
            schedule.academicTitle = item.academicTitle;
            schedule.department = item.department;
            schedule.studentCount = item.studentCount;
            schedule.credit = item.credit;
            schedule.property = item.property;
            schedule.dayOfWeek = item.dayOfWeek;
            return schedule;
        });
        if (!schedules) {
            return null;
        } else if (schedules.length === 1) {
            return schedules[0];
        } else {
            const temp: Schedule[] = _.uniqWith(schedules, (a: Schedule, b: Schedule) => a.uniqueCompare(b));
            if (temp.length === 1) {
                temp[0].studentCount = 0;
                temp[0].courseClassName = '';
                ss.forEach((item: Schedule) => {
                    temp[0].studentCount += item.studentCount;
                    temp[0].courseClassName += (!item.courseClassName ? '' : ('/' + item.courseClassName));
                });
                return temp[0];
            } else {
                const schedule: any = {};
                temp.forEach((s: Schedule) => {
                    if (schedule === {}) {
                        schedule.department = s.department;
                        schedule.academicTitle = s.academicTitle;
                        schedule.courseClassName = s.courseClassName;
                        schedule.teacherId = s.teacherId;
                        schedule.teacherName = s.teacherName;
                        schedule.startWeek = s.startWeek;
                        schedule.endWeek = s.endWeek;
                        schedule.oddEven = s.oddEven;
                        schedule.startSection = s.startSection;
                        schedule.course = s.course;
                        schedule.place = s.place;
                        schedule.credit = s.credit;
                        schedule.property = s.property;
                        schedule.studentCount = s.studentCount;
                    } else {
                        schedule.department += '/' + s.department;
                        schedule.academicTitle += '/' + s.academicTitle;
                        schedule.courseClassName += '/' + s.courseClassName;
                        schedule.teacherId += '/' + s.teacherId;
                        schedule.teacherName += '/' + s.teacherName;
                        schedule.course += '/' + s.course;
                        schedule.place += '/' + s.place;
                        schedule.credit += '/' + s.credit;
                        schedule.property += '/' + s.property;
                        schedule.studentCount += '/' + s.studentCount;
                    }
                });
                schedule.hasError = '严重错误：该老师在同一时间安排了2门以上不同的课程！请与管理员联系！';
                return schedule;
            }
        }
    }
}

export interface ScheduleSection {
    id: number;
    name: string;
    start: number;
    total: number;
    includes: number[];
}

export interface EvaluationItem {
    id: number;
    title: string;
    name: string;
    value?: number;
}

export interface Term {
    startWeek: number;
    maxWeek: number;
    currentWeek: number;
    startDate: moment.Moment;
    swapDates: moment.Moment[];
    endWeek: number;
}
