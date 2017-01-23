import {Component, Input} from '@angular/core';

import {RollcallTypes, Student} from '../form.model';

@Component({
    selector: 'rollcall-status',
    styleUrls: ['rollcall-status.component.scss'],
    templateUrl: 'rollcall-status.component.html',
})
export class RollcallStatusComponent {
    @Input() student: Student;

    label(key: string): string {
        return RollcallTypes[key].label;
    }
}
