import {Component, Input} from '@angular/core';

import {Student} from '../form.model';

@Component({
    selector: 'rollcall-status',
    styleUrls: ['rollcall-status.component.scss'],
    templateUrl: 'rollcall-status.component.html',
})
export class RollcallStatusComponent {
    @Input() student: Student;
}
