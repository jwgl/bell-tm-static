import {AuditStatus} from '../constants/audit-status';
import {Labels} from '../models';

const statusLabels: Labels<AuditStatus> = new Labels(AuditStatus, {
    [AuditStatus.CREATED]:   {class: 'badge-default', text: '未提交'},
    [AuditStatus.SUBMITTED]: {class: 'badge-info',    text: '待审核'},
    [AuditStatus.CHECKED]:   {class: 'badge-info',    text: '待审批'},
    [AuditStatus.REJECTED]:  {class: 'badge-warning', text: '退回'},
    [AuditStatus.APPROVED]:  {class: 'badge-success', text: '已审批'},
    [AuditStatus.REVOKED]:   {class: 'badge-danger',  text: '回收'},
    [AuditStatus.PROGRESS]:  {class: 'badge-primary', text: '处理中'},
    [AuditStatus.FINISHED]:  {class: 'badge-success', text: '完成'},
    [AuditStatus.CLOSED]:    {class: 'badge-danger',  text: '关闭'},
    [AuditStatus.DELETED]:   {class: 'badge-danger',  text: '删除'},
});

export function auditStatusText(status: AuditStatus) {
    return statusLabels.getText(status);
}

export function auditStatusClass(status: AuditStatus) {
    return statusLabels.getClass(status);
}
