import {Label} from 'core/models';
import {dayOfWeekText, sectionRangeText} from 'core/utils';

import {LeaveType, LeaveTypeNames} from '../../leave/shared/form.model';
import {RollcallLabels, RollcallType} from '../../rollcall/form/form.model';

/* tslint:disable:max-classes-per-file */
abstract class AttendanceDetail {
    id: number;
    week: number;
    dayOfWeek: number;
    course: string;
    courseItem: string;
    teacher: string;
    startSection: number;
    totalSection: number;
    valid: boolean;
    studentLeaveFormId: number;
    freeListenFormId: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.week = dto.week;
        this.dayOfWeek = dto.dayOfWeek;
        this.course = dto.course;
        this.courseItem = dto.courseItem;
        this.teacher = dto.teacher;
        this.startSection = dto.startSection;
        this.totalSection = dto.totalSection;
        this.valid = dto.valid;
        this.studentLeaveFormId = dto.studentLeaveFormId;
        this.freeListenFormId = dto.freeListenFormId;
    }

    abstract get invalid(): boolean;

    toString(): string {
        return `第${this.week}周 星期${dayOfWeekText(this.dayOfWeek)} ${sectionRangeText(this)} / ${this.course}` +
               `${this.courseItem ? '【' + this.courseItem + '】' : ''}` +
               ` / ${this.teacher}`;
    }
}

export class RollcallDetail extends AttendanceDetail {
    type: RollcallType;

    constructor(dto: any) {
        super(dto);
        this.type = dto.type;
    }

    get labels(): Label[] {
        return RollcallLabels[this.type];
    }

    get invalid(): boolean {
        return !!this.freeListenFormId || !!this.studentLeaveFormId;
    }
}

export class StudentLeaveDetail extends AttendanceDetail {
    type: LeaveType;

    constructor(dto: any) {
        super(dto);
        this.type = dto.type;
    }

    get label(): string {
        return LeaveTypeNames[this.type];
    }

    get invalid(): boolean {
        return !!this.freeListenFormId;
    }
}

export class Student {
    id: string;
    name: string;
    adminClass: string;
    rollcalls: RollcallDetail[];
    leaves: StudentLeaveDetail[];
    absent: number;
    late: number;
    early: number;
    total: number;
    leave: number;

    constructor(dto: any) {
        this.id = dto.id;
        this.name = dto.name;
        this.adminClass = dto.adminClass;
        this.absent = dto.absent ? dto.absent : 0;
        this.late = dto.late ? dto.late : 0;
        this.early = dto.early ? dto.early : 0;
        this.total = dto.total ? dto.total : 0;
        this.leave = dto.leave ? dto.leave : 0;
    }
}
