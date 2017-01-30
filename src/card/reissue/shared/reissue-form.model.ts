export class CardReissueForm {
    id: number;
    reason: string;
    status: string;
    workflowInstanceId: string;

    student: {
        id: string,
        name: string,
        birthday: string,
        province: string,
        department: string,
        subject: string,
        educationLevel: string,
    };

    constructor(dto: any) {
        this.id = dto.id;
        this.reason = dto.reason;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.student = dto.student;
    }

    get title(): string {
        return `补办学生证申请-${this.student.id} ${this.student.name}`;
    }
}
