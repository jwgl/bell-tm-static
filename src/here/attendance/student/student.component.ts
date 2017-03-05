import {Component, ElementRef} from '@angular/core';

import {Label} from 'core/models';

import {RollcallLabels, RollcallType} from '../../rollcall/form/form.model';
import {AttendanceStudentMainService} from './main.service';

@Component({
    selector: 'attendance-student',
    styleUrls: ['student.component.scss'],
    templateUrl: 'student.component.html',
})
export class AttendanceStudentComponent {
    rollcalls: any[];
    leaves: any[];
    student: any;
    loaded = false;
    constructor(private service: AttendanceStudentMainService) {
        this.service.loadList().subscribe(dto => {
            this.loaded = true;
            this.rollcalls = dto.list.filter((it: any) => it.type !== 4);
            this.leaves = dto.list.filter((it: any) => it.type === 4);
        }, (error) => {
            if (error.status === 403) {
                alert('无权访问。');
            }
        });
    }

    getLabels(type: RollcallType): Label[] {
        return RollcallLabels[type];
    }
}
