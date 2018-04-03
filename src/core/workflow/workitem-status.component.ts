import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';
import {Labels} from '../models';

const statusLabels: Labels<AuditStatus> = new Labels(AuditStatus, {
    [AuditStatus.SUBMITTED]: {class: 'text-primary', text: '提交'},
    [AuditStatus.CHECKED]:   {class: 'text-primary', text: '审核'},
    [AuditStatus.REJECTED]:  {class: 'text-warning', text: '退回'},
    [AuditStatus.APPROVED]:  {class: 'text-success', text: '审批'},
    [AuditStatus.REVOKED]:   {class: 'text-danger',  text: '回收'},
    [AuditStatus.PROGRESS]:  {class: 'text-primary', text: '开始处理'},
    [AuditStatus.FINISHED]:  {class: 'text-success', text: '处理完成'},
    [AuditStatus.CLOSED]:    {class: 'text-danger',  text: '关闭'},
    [AuditStatus.DELETED]:   {class: 'text-danger',  text: '删除'},
    [AuditStatus.STEP1]:     {class: 'text-info',    text: '步骤1'},
    [AuditStatus.STEP2]:     {class: 'text-info',    text: '步骤2'},
    [AuditStatus.STEP3]:     {class: 'text-info',    text: '步骤3'},
    [AuditStatus.STEP4]:     {class: 'text-info',    text: '步骤4'},
    [AuditStatus.STEP5]:     {class: 'text-info',    text: '步骤5'},
    [AuditStatus.STEP6]:     {class: 'text-info',    text: '步骤6'},
    [AuditStatus.STEP7]:     {class: 'text-info',    text: '步骤7'},
    [AuditStatus.STEP8]:     {class: 'text-info',    text: '步骤8'},
    [AuditStatus.STEP9]:     {class: 'text-info',    text: '步骤9'},
});

@Component({
    selector: 'workitem-status',
    template: '<span [ngClass]="class">{{text}}</span>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkitemStatusComponent {
    @Input() status: AuditStatus;

    get class(): string {
        return statusLabels.getClass(this.status);
    }

    get text(): string {
        return statusLabels.getText(this.status);
    }
}
