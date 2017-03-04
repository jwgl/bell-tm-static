import {Component, ElementRef} from '@angular/core';

import {Label} from 'core/models';

import {RollcallLabels, RollcallType} from '../form/form.model';
import {RollcallStudentService} from './student.service';

@Component({
    selector: 'rollcall-student',
    styleUrls: ['student.component.scss'],
    templateUrl: 'student.component.html',
})
export class RollcallStudentComponent {
    rollcalls: any[];
    leaves: any[];
    student: any;
    loaded = false;
    constructor(private service: RollcallStudentService) {
        this.service.loadList().subscribe(dto => {
            this.loaded = true;
            this.rollcalls = dto.list.filter((it: any) => it.type !== 4);
            this.leaves = dto.list.filter((it: any) => it.type === 4);
            this.student = dto.student;
        });
    }

    getLabels(type: RollcallType): Label[] {
        return RollcallLabels[type];
    }
}
