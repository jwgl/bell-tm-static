import {Schedule} from 'core/models';

export class FreeListenForm {
    id: number;
    term: number;
    studentId: string;
    studentName: string;
    atSchool: boolean;
    subject: string;
    grade: number;
    adminClass: string;
    checkerId: string;
    checkerName: string;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items = [] as FreeListenItem[];
    /**
     * 无效的免听项，免听申请成功后，由于调整班级，该安排已不属于当前学生
     */
    invalidItems = [] as Array<{id: number, scheduleId: string}>;
    /**
     * 其它表单中免听项
     */
    existedItems: Array<{taskScheduleId: string, status: string}>;

    constructor(dto: any, schedules: Schedule[]) {
        this.id = dto.id;
        this.term = dto.term;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.atSchool = dto.atSchool;
        this.subject = dto.subject;
        this.grade = dto.grade;
        this.adminClass = dto.adminClass;
        this.checkerId = dto.checkerId;
        this.checkerName = dto.checkerName;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;

        for (const item of dto.items as Array<{id: number, scheduleId: string}>) {
            const schedule = schedules.find(s => s.id === item.scheduleId);
            if (schedule) {
                this.items.push(new FreeListenItem(item, schedule));
            } else {
                this.invalidItems.push(item);
            }
        }

        this.existedItems = dto.existedItems;
    }

    get title(): string {
        return this.id ? `免听申请#${this.id}` : '免听申请';
    }

    contains(item: FreeListenItem) {
        return !!this.items.find(it => it.schedule.id === item.schedule.id);
    }

    scheduleSelected(schedule: Schedule): boolean {
        return !!this.items.find(i => i.schedule.id === schedule.id);
    }

    scheduleExisted(schedule: Schedule): boolean {
        return !!this.existedItems.find(it => it.taskScheduleId === schedule.id);
    }

    scheduleApproved(schedule: Schedule): boolean {
        const item = this.existedItems.find(it => it.taskScheduleId === schedule.id);
        return item && item.status === 'APPROVED';
    }
}

/* tslint:disable:max-classes-per-file */
export class FreeListenItem {
    id: number;
    schedule: Schedule;

    constructor(dto: any, schedule?: Schedule) {
        this.id = dto.id;
        this.schedule = schedule;
    }

    toString() {
        return '';
        // return `${this.schedule.courseLabel} / `
        //      + `${this.schedule.weeksLabel} ${this.schedule.dayOfWeekLabel} ${this.schedule.sectionsLabel} / `
        //      + `${this.schedule.teacherName}`;
    }
}

export class FreeListenConfig {
    startDate: Date;
    endDate: Date;
    today: Date;

    constructor(dto: any) {
        this.startDate = new Date(dto.startDate);
        this.endDate = new Date(dto.endDate);
        this.today = new Date(dto.today);
    }

    get isOpening(): boolean {
        return this.today >= this.startDate && this.today <= this.endDate;
    }
}
