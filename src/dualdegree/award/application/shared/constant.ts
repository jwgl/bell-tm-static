import {Labels} from 'core/models/label';

export const paperTypeLabels = [
    {id: 1, label: '本科论文'},
    {id: 2, label: '硕士论文'},
    {id: 3, label: '课程论文'},
];

export enum DualdegreeAuditStatus {
    CREATED,
    REJECTED,
    CLOSED,
    FINISHED,
    STEP1,
    STEP2,
    STEP3,
    STEP4,
    STEP5,
}

export const statusLabels: Labels<DualdegreeAuditStatus> = new Labels(DualdegreeAuditStatus, {
    [DualdegreeAuditStatus.CREATED]:   {class: 'badge-secondary', text: '未提交'},
    [DualdegreeAuditStatus.STEP1]:     {class: 'badge-info',    text: '提交'},
    [DualdegreeAuditStatus.STEP2]:   {class: 'badge-success',    text: '初审通过'},
    [DualdegreeAuditStatus.STEP3]:   {class: 'badge-secondary',    text: '论文提交'},
    [DualdegreeAuditStatus.STEP4]:   {class: 'badge-secondary',    text: '导师审核中'},
    [DualdegreeAuditStatus.STEP5]:   {class: 'badge-warning',    text: '论文退回'},
    [DualdegreeAuditStatus.REJECTED]:   {class: 'badge-warning',    text: '初审退回'},
    [DualdegreeAuditStatus.CLOSED]:   {class: 'badge-danger',    text: '关闭'},
    [DualdegreeAuditStatus.FINISHED]:   {class: 'badge-success',    text: '论文通过'},
});
