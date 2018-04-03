export class ApplicationForm {
    id: number;
    studentId: string;
    studentName: string;
    awardId: number;
    status: string;
    workflowInstanceId: string;
    dateSubmitted: string;
    checker: string;
    dateChecked: string;
    approver: string;
    paperApprover: string;
    paperApproverEmail: string;
    dateApproved: string;
    universityCooperative: string;
    majorCooperative: string;
    email: string;
    linkman: string;
    phone: string;
    editable: boolean;

    constructor(dto: any) {
        this.id = dto.id;
        this.universityCooperative = dto.universityCooperative;
        this.majorCooperative = dto.majorCooperative;
        this.email = dto.email;
        this.linkman = dto.linkman;
        this.phone = dto.phone;
        this.awardId = dto.awardId;
        this.studentId = dto.studentId;
        this.studentName = dto.studentName;
        this.status = dto.status;
        this.workflowInstanceId = dto.workflowInstanceId;
        this.dateSubmitted = dto.dateSubmitted;
        this.checker = dto.checker;
        this.dateChecked = dto.dateChecked;
        this.approver = dto.approver;
        this.paperApprover = dto.paperApprover;
        this.paperApproverEmail = dto.mentorEmail;
        this.dateApproved = dto.dateApproved;
        this.editable = dto.editable;
    }

    get title(): string {
        return this.id ? `国内学位申请单#${this.id}` : '国内学位申请单';
    }
}

export const FileTypes = [
    {prefix: 'photo', label: '上传照片', types: ['jpg', 'jpeg']},
    {prefix: 'certi', label: '上传证书', types: ['jpg', 'jpeg', 'pdf']},
    {prefix: 'trans1', label: '上传国外本科成绩', types: ['jpg', 'jpeg', 'pdf']},
    {prefix: 'trans2', label: '上传国外硕士成绩', types: ['jpg', 'jpeg', 'pdf']},
    {prefix: 'trans3', label: '上传其他成绩', types: ['jpg', 'jpeg', 'pdf']},
    {prefix: 'paper', label: '上传论文', types: ['pdf', 'doc', 'docx']},
    {prefix: 'review', label: '上传论文', types: ['pdf', 'doc', 'docx']},
];
