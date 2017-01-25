export class LeaveForm {
    id: number;
    term: number;
    studentId: string;
    studentName: string;
    adminClass: string;
    type: number;
    reason: string;
    status: string;
    workflowInstanceId: string;
    items: LeaveItem[];
    removedItems: LeaveItem[];

    constructor(dto: any) {
        this.id = dto.id;
        this.term = dto.term;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.adminClass = dto.adminClass;
        this.type = dto.type;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.items = dto.items.map((item: any) => new LeaveItem(this, item));
        this.removedItems = [];
    }

    get title(): string {
        return this.id ? `假条#${this.id}` : '假条';
    }
}

export class LeaveItem {
    form: LeaveForm;
    id: number;
    week: number;
    dayOfWeek: number;
    taskSchedule: {
        id: string;
        course: string;
        dayOfWeek: number;
        startSection: number;
        totalSection: number;
    };

    constructor(form: LeaveForm, dto: any) {
        this.form = form;
        this.id = dto.id;
        this.week = dto.number;
        this.dayOfWeek = dto.dayOfWeek;
        this.taskSchedule = dto.taskSchedule;
    }
}
