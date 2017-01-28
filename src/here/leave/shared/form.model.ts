import {Schedule} from '../../shared/schedule/schedule.model';
import * as moment from 'moment';
import * as _ from 'lodash';

export enum LeaveType {
    PrivateAffair = 1,
    SickLeave = 2,
    PublicAffair = 3,
}

export const LeaveTypes = [
    {type: LeaveType.PrivateAffair, label: '事假'},
    {type: LeaveType.SickLeave, label: '病假'},
    {type: LeaveType.PublicAffair, label: '公假'},
];

export const LeaveTypeNames = _.fromPairs(_.map(LeaveTypes, it => [it.type, it.label]));

export class LeaveForm {
    id: number;
    term: number;
    studentId: string;
    studentName: string;
    adminClass: string;
    type: LeaveType;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items: LeaveItem[];

    constructor(dto: any, schedules: Schedule[]) {
        this.id = dto.id;
        this.term = dto.term;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.adminClass = dto.adminClass;
        this.type = dto.type ? dto.type : LeaveType.PrivateAffair;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.items = dto.items.map((item: any) => {
            let leaveItem = new LeaveItem(this, item);
            if (item.taskScheduleId) {
                leaveItem.schedule = schedules.find(s => s.id === item.taskScheduleId);
            }
            return leaveItem;
        });
    }

    get title(): string {
        return this.id ? `请假#${this.id}` : '请假';
    }

    contains(item: LeaveItem) {
        return !!this.items.find(i => i.equalsTo(item));
    }

    containsWeek(week: number) {
        return !!this.items.find(i => i.week === week);
    }

    weekSelected(week: number): boolean {
        return !!this.items.find(i => i.week === week && !i.dayOfWeek && !i.schedule);
    }

    dayOfWeekSelected(week: number, dayOfWeek: number): boolean {
        return !!this.items.find(i => i.week === week && i.dayOfWeek === dayOfWeek);
    }

    scheduleSelected(week: number, schedule: Schedule): boolean {
        return !!this.items.find(i => i.week === week && i.schedule && i.schedule.id === schedule.id);
    }
}

export class LeaveItem {
    form: LeaveForm;
    id: number;
    week: number;
    dayOfWeek: number;
    schedule: Schedule;

    constructor(form: LeaveForm, dto: any) {
        this.form = form;
        this.id = dto.id;
        this.week = dto.week;
        this.dayOfWeek = dto.dayOfWeek;
    }

    equalsTo(other: LeaveItem): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }

        if (this.schedule && other.schedule) {
            return this.week === other.week && this.schedule.id === other.schedule.id;
        } else if (!this.schedule && !other.schedule) {
            return this.week === other.week && this.dayOfWeek === other.dayOfWeek;
        } else {
            return false;
        }
    }

    toString() {
        if (this.schedule) {
            return `第${this.week}周 ${this.schedule.label}`;
        } else if (this.dayOfWeek) {
            return `第${this.week}周 ${moment.weekdaysShort(this.dayOfWeek)}`;
        } else {
            return `第${this.week}周`;
        }
    }
}
