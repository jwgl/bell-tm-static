import {Component, Input} from '@angular/core';

import {RollcallType, RollcallTypes, RollcallKeys, Student} from '../form.model';

@Component({
    selector: 'rollcall-status',
    styleUrls: ['rollcall-status.component.scss'],
    templateUrl: 'rollcall-status.component.html',
})
export class RollcallStatusComponent {
    @Input() student: Student;

    typeKeys(student: Student): string[] {
        return student.rollcallItem ? RollcallKeys.filter(key => RollcallType.contains(student.rollcallType, key)) : [];
    }

    label(key: string): string {
        return RollcallTypes[key].label;
    }
}
