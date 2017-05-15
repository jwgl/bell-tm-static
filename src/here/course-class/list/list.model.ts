import {Label} from 'core/models';
import {dayOfWeekText, sectionRangeText} from 'core/utils';

import {RollcallLabels, RollcallType} from '../../rollcall/form/form.model';

/* tslint:disable:max-classes-per-file */
class AttendanceStats {
    absent = 0;
    late = 0;
    early = 0;
    leave = 0;

    get total(): number {
        return this.absent + this.late + this.early;
    }

    get hasDetails(): boolean {
        return this.absent !== 0 ||
               this.late !== 0 ||
               this.early !== 0 ||
               this.leave !== 0;
    }
}

const emptyAttendenceStats = new AttendanceStats();

export class Attendance {
    week: number;
    dayOfWeek: number;
    course: string;
    courseItem: string;
    teacher: string;
    startSection: number;
    totalSection: number;
    type: RollcallType;
    valid: boolean;
    studentLeave: number;
    freeListen: number;

    constructor(dto: any) {
        this.week = dto.week;
        this.dayOfWeek = dto.dayOfWeek;
        this.course = dto.course;
        this.courseItem = dto.courseItem;
        this.teacher = dto.teacher;
        this.startSection = dto.startSection;
        this.totalSection = dto.totalSection;
        this.type = dto.type;
        this.valid = dto.valid;
        this.studentLeave = dto.studentLeave;
        this.freeListen = dto.freeListen;
    }

    get labels(): Label[] {
        return RollcallLabels[this.type];
    }

    toString(): string {
        return `第${this.week}周 星期${dayOfWeekText(this.dayOfWeek)} ${sectionRangeText(this)} / ${this.course}` +
               `${this.courseItem ? '【' + this.courseItem + '】' : ''}` +
               ` / ${this.teacher}`;
    }
}

export class Student {
    id: string;
    name: string;
    subject: string;
    adminClass: string;
    rollcalls: Attendance[];
    leaves: Attendance[];
    attendanceStats: AttendanceStats;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.subject = dto.subject;
        this.adminClass = dto.adminClass;
        this.attendanceStats = emptyAttendenceStats;
    }

    get hasDetails(): boolean {
        return this.attendanceStats.hasDetails;
    }
}

export class CourseClass {
    id: string;
    code: string;
    name: string;
    course: string;
    startWeek: number;
    endWeek: number;
    department: string;
    students: Student[];
    private studentMap: {[key: string]: Student} = {};

    constructor(dto: any) {
        this.id = dto.id;
        this.code = dto.code;
        this.name = dto.name;
        this.course = dto.course;
        this.startWeek = dto.startWeek;
        this.endWeek = dto.endWeek;
        this.department = dto.department;
        this.students = dto.students.map((s: any) => new Student(s));
        this.students.forEach(s => this.studentMap[s.id] = s);
    }

    setStats(stats: any[]) {
        stats.forEach((a: any) => {
            if (!this.studentMap[a.id]) {
                return;
            }
            const attendanceStats = new AttendanceStats();
            attendanceStats.absent = a.absent;
            attendanceStats.late = a.late;
            attendanceStats.early = a.early;
            attendanceStats.leave = a.leave;
            this.studentMap[a.id].attendanceStats = attendanceStats;
        });
    }
}
