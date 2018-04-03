import * as moment from 'moment';

export class AwardForm {
    id: number;
    title: string;
    content: string;
    requestBegin: string;
    requestEnd: string;
    paperEnd: string;
    approvalEnd: string;
    departmentId: string;
    departmentName: string;

    constructor(dto: any) {
        this.id = dto.id;
        this.title = dto.title;
        this.content = dto.content;
        this.requestBegin = dto.requestBegin;
        this.requestEnd = dto.requestEnd;
        this.paperEnd = dto.paperEnd;
        this.approvalEnd = dto.approvalEnd;
        this.departmentId = dto.departmentId;
        this.departmentName = dto.departmentName;
    }

    get isApplyDateValid(): boolean {
        return !(moment().isBefore(this.requestBegin, 'day') || moment().isAfter(this.requestEnd, 'day'));
    }

    get isCheckDateValid(): boolean {
        return !(moment().isBefore(this.requestBegin, 'day') || moment().isAfter(this.approvalEnd, 'day'));
    }

    get isPaperDateValid(): boolean {
        return !(moment().isBefore(this.requestBegin, 'day') || moment().isAfter(this.paperEnd, 'day'));
    }
}
