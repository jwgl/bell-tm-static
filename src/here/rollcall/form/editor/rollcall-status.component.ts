import {Component, Input, Inject} from '@angular/core';

import {RollcallTypes, Student} from '../form.model';
import {LeaveType, LeaveTypeNames} from '../../../leave/shared/form.model';
@Component({
    selector: 'rollcall-status',
    styleUrls: ['rollcall-status.component.scss'],
    templateUrl: 'rollcall-status.component.html',
})
export class RollcallStatusComponent {
    @Input() student: Student;

    constructor(@Inject('PUBLIC_LEAVE_WEB_URL') private leaveUrl: string) {}

    label(key: string): string {
        return RollcallTypes[key].label;
    }

    leaveTypeLabel(type: LeaveType): string {
        return LeaveTypeNames[type];
    }
}
