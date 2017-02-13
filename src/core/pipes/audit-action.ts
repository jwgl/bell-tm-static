import {Pipe} from '@angular/core';

import {AuditAction} from '../constants/audit-action';

const ACTION_INFO = {
    [AuditAction.CREATE]: {class: 'text-primary', label: '新建'},
    [AuditAction.DELETE]: {class: 'text-primary', label: '删除'},
    [AuditAction.UPDATE]: {class: 'text-primary', label: '修改'},
    [AuditAction.COMMIT]: {class: 'text-primary', label: '提交'},
    [AuditAction.CANCEL]: {class: 'text-primary', label: '取消'},
    [AuditAction.ACCEPT]: {class: 'text-success', label: '同意'},
    [AuditAction.REJECT]: {class: 'text-warning', label: '退回'},
    [AuditAction.REVIEW]: {class: 'text-success', label: '加签'},
    [AuditAction.REVOKE]: {class: 'text-danger',  label: '回收'},
    [AuditAction.CLOSE]:  {class: 'text-danger',  label: '关闭'},
    [AuditAction.OPEN]:   {class: 'text-warning', label: '打开'},
};

@Pipe({name: 'actionName'})
export class ActionNamePipe {
    transform(value: String, arg: string) {
        if (arg) {
            if (value === 'ACCEPT') {
                if (arg === 'CHECKED' || arg.endsWith('.view')) {
                    return '审批';
                } else {
                    return '审核';
                }
            }
        }
        return ACTION_INFO[(AuditAction as any)[value as any]].label;
    }
}

/* tslint:disable:max-classes-per-file */
@Pipe({name: 'actionClass'})
export class ActionClassPipe {
    transform(value: any, args: any[]) {
        return ACTION_INFO[(AuditAction as any)[value as any]].class;
    }
}
