export interface Student {
    id: string;
    name: string;
    birthday: string;
    province: string;
    department: string;
    subject: string;
    educationLevel: string;
};

export class ReissueForm {
    id: number;
    reason: string;
    status: string;
    student: Student;
    workflowInstanceId: string;

    constructor(dto: any, student: Student) {
        this.id = dto.id;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.student = student;
    }

    get title(): string {
        return `补办学生证申请-${this.student.id} ${this.student.name}`;
    }
}
