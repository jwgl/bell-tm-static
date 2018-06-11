import { Pipe } from '@angular/core';

import { DualdegreeAuditStatus, statusLabels } from '../constant';

@Pipe({name: 'statusLabel'})
export class DualdegreeStatusPipe {
    transform(value: DualdegreeAuditStatus, arg: string) {
        if (arg === 'text') {
            return statusLabels.getText(value);
        } else if (arg === 'class') {
            return statusLabels.getClass(value);
        }
    }
}
