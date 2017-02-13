import {Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';

const STATUS_INFO: {[key: number]: {class: string, label: string}} = {
    [AuditStatus.SUBMITTED]: {class: 'text-primary', label: '提交'},
    [AuditStatus.CHECKED]:   {class: 'text-primary', label: '审核'},
    [AuditStatus.REJECTED]:  {class: 'text-warning', label: '退回'},
    [AuditStatus.APPROVED]:  {class: 'text-success', label: '审批'},
    [AuditStatus.REVOKED]:   {class: 'text-danger',  label: '回收'},
    [AuditStatus.PROGRESS]:  {class: 'text-primary', label: '开始处理'},
    [AuditStatus.FINISHED]:  {class: 'text-success', label: '处理完成'},
    [AuditStatus.CLOSED]:    {class: 'text-danger',  label: '关闭'},
    [AuditStatus.DELETED]:   {class: 'text-danger',  label: '删除'},
};

@Component({
    selector: 'workitem-status',
    template: '<span [ngClass]="class" style="font-weight:initial">{{label}}</span>',
})
export class WorkitemStatusComponent {
    @Input() status: string;

    get class(): string {
        return STATUS_INFO[(AuditStatus as any)[this.status as any]].class;
    }

    get label(): string {
        return STATUS_INFO[(AuditStatus as any)[this.status as any]].label;
    }
}
