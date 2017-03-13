import {Pipe} from '@angular/core';

const FORM_STATUS: {[key: string]: string} = {
    CREATED  : '新建',
    SUBMITTED: '待审批',
    APPROVED : '已审批',
    PROGRESS : '制作中',
    REJECTED : '退回',
    FINISHED : '完成',
};

@Pipe({name: 'formStatus'})
export class FormStatusPipe {
    transform(value: string) {
        return FORM_STATUS[value];
    }
}
