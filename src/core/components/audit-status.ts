import {Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';

const STATUS_INFO: {[key: number]: {class: string, label: string}} = {
    [AuditStatus.CREATED]:   {class: 'badge-default', label: '未提交'},
    [AuditStatus.SUBMITTED]: {class: 'badge-info',    label: '待审核'},
    [AuditStatus.CHECKED]:   {class: 'badge-info',    label: '待审批'},
    [AuditStatus.REJECTED]:  {class: 'badge-warning', label: '退回'},
    [AuditStatus.APPROVED]:  {class: 'badge-success', label: '已审批'},
    [AuditStatus.REVOKED]:   {class: 'badge-danger',  label: '回收'},
    [AuditStatus.PROGRESS]:  {class: 'badge-primary', label: '处理中'},
    [AuditStatus.FINISHED]:  {class: 'badge-success', label: '完成'},
    [AuditStatus.CLOSED]:    {class: 'badge-danger',  label: '关闭'},
    [AuditStatus.DELETED]:   {class: 'badge-danger',  label: '删除'},
};

@Component({
    selector: 'audit-status',
    styles: ['label { font-weight:initial; margin-bottom:0; }'],
    template: '<label class="badge" [ngClass]="class">{{label}}</label>',
})
export class AuditStatusComponent {
    @Input() status: string;

    get class(): string {
        return STATUS_INFO[(AuditStatus as any)[this.status as any]].class;
    }

    get label(): string {
        return STATUS_INFO[(AuditStatus as any)[this.status as any]].label;
    }
}
