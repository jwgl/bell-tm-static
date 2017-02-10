import {Schedule} from '../../shared/schedule/schedule.model';

export class FreeListenForm {
    id: number;
    term: number;
    studentId: string;
    studentName: string;
    subject: string;
    grade: number;
    adminClass: string;
    checkerId: string;
    checkerName: string;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items: FreeListenItem[];

    constructor(dto: any, schedules: Schedule[]) {
        this.id = dto.id;
        this.term = dto.term;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.subject = dto.subject;
        this.grade = dto.grade;
        this.adminClass = dto.adminClass;
        this.checkerId = dto.checkerId;
        this.checkerName = dto.checkerName;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.items = dto.items.map((item: any) => {
            let freeItem = new FreeListenItem(this, item);
            if (item.taskScheduleId) {
                freeItem.schedule = schedules.find(s => s.id === item.taskScheduleId);
            }
            return freeItem;
        });
    }

    get title(): string {
        return this.id ? `免听#${this.id}` : '免听';
    }

    contains(item: FreeListenItem) {
        return !!this.items.find(i => i.equalsTo(item));
    }

    scheduleSelected(schedule: Schedule): boolean {
        return !!this.items.find(i => i.schedule.id === schedule.id);
    }
}

export class FreeListenItem {
    form: FreeListenForm;
    id: number;
    schedule: Schedule;

    constructor(form: FreeListenForm, dto: any) {
        this.form = form;
        this.id = dto.id;
    }

    equalsTo(other: FreeListenItem): boolean {
        if (this.id && other.id && this.id === other.id) {
            return true;
        }

        if (this.schedule && other.schedule) {
            return this.schedule.id === other.schedule.id;
        }
    }

    toString() {
        return `${this.schedule.courseLabel} /`
             + `${this.schedule.weeksLabel} ${this.schedule.dayOfWeekLabel} ${this.schedule.sectionsLabel} /`
             + `${this.schedule.teacherName}`;
    }
}
