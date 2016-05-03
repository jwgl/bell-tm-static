import {Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';

const STATUS_INFO = {
    [AuditStatus.CREATED]:   {class: 'tag-default', label: '未提交'},
    [AuditStatus.COMMITTED]: {class: 'tag-info',    label: '待审核'},
    [AuditStatus.CHECKED]:   {class: 'tag-info',    label: '待审批'},
    [AuditStatus.REJECTED]:  {class: 'tag-warning', label: '退回'},
    [AuditStatus.APPROVED]:  {class: 'tag-success', label: '完成'},
    [AuditStatus.REVOKED]:   {class: 'tag-danger',  label: '回收'},
    [AuditStatus.CLOSED]:    {class: 'tag-danger',  label: '关闭'},
    [AuditStatus.DELETED]:   {class: 'tag-danger',  label: '删除'},
};

@Component({
    selector: 'audit-status',
    template: '<label class="tag" [ngClass]="class" style="font-weight:initial">{{label}}</label>',
})
export class AuditStatusComponent {
    @Input() status: string;

    get class(): string {
        return STATUS_INFO[AuditStatus[this.status]].class;
    }

    get label(): string {
        return STATUS_INFO[AuditStatus[this.status]].label;
    }
}
