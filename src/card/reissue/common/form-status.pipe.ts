import {Pipe} from '@angular/core';

const FORM_STATUS = {
    CREATED  : '新建',
    COMMITTED: '待审核',
    APPROVED : '已审核',
    MAKING   : '制作中',
    REJECTED : '退回',
    FINISHED : '完成',
};

@Pipe({name: 'formStatus'})
export class FormStatusPipe {
    transform(value: string) {
        return FORM_STATUS[value];
    }
}
