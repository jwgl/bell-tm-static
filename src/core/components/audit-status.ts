import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {AuditStatus} from '../constants/audit-status';
import {auditStatusClass, auditStatusText} from '../utils/audit-status';

@Component({
    selector: 'audit-status',
    styles: ['label { font-weight:initial; margin-bottom:0; }'],
    template: '<label class="badge" [ngClass]="class">{{text}}</label>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuditStatusComponent {
    @Input() status: AuditStatus;

    get class(): string {
        return auditStatusClass(this.status);
    }

    get text(): string {
        return auditStatusText(this.status);
    }
}
