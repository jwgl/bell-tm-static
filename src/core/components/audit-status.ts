import {Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';

const STATUS_INFO: {[key: number]: {class: string, label: string}} = {
    [AuditStatus.CREATED]:   {class: 'tag-default', label: '未提交'},
    [AuditStatus.COMMITTED]: {class: 'tag-info',    label: '待审核'},
    [AuditStatus.CHECKED]:   {class: 'tag-info',    label: '待审批'},
    [AuditStatus.REJECTED]:  {class: 'tag-warning', label: '退回'},
    [AuditStatus.APPROVED]:  {class: 'tag-success', label: '完成'},
    [AuditStatus.REVOKED]:   {class: 'tag-danger',  label: '回收'},
    [AuditStatus.PROGRESS]:  {class: 'tag-primary', label: '处理中'},
    [AuditStatus.FINISHED]:  {class: 'tag-success', label: '完成'},
    [AuditStatus.CLOSED]:    {class: 'tag-danger',  label: '关闭'},
    [AuditStatus.DELETED]:   {class: 'tag-danger',  label: '删除'},
};

@Component({
    selector: 'audit-status',
    styles: ['label { font-weight:initial; margin-bottom:0; }'],
    template: '<label class="tag" [ngClass]="class">{{label}}</label>',
})
export class AuditStatusComponent {
    @Input() status: string;

    get class(): string {
        return STATUS_INFO[<any>AuditStatus[<any>this.status]].class;
    }

    get label(): string {
        return STATUS_INFO[<any>AuditStatus[<any>this.status]].label;
    }
}
