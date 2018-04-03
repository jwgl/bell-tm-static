import {AwardForm} from '../../shared/form.model';

declare module '../../shared/form.model' {
    interface AwardForm {
        toServerDto(): any;
    }
}

AwardForm.prototype.toServerDto = function(this: AwardForm): any {
    return {
        title: this.title,
        content: this.content,
        requestBegin: this.requestBegin,
        requestEnd: this.requestEnd,
        paperEnd: this.paperEnd,
        approvalEnd: this.approvalEnd,
        departmentId: this.departmentId,
    };
};
