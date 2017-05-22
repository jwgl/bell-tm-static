import {Component, ElementRef} from '@angular/core';

import {Label} from 'core/models';

import {RollcallLabels, RollcallType} from '../../rollcall/form/form.model';
import {RollcallDetail, Student, StudentLeaveDetail} from '../shared/attendance.model';
import {AttendanceStudentMainService} from './main.service';

@Component({
    selector: 'attendance-student',
    styleUrls: ['student.component.scss'],
    templateUrl: 'student.component.html',
})
export class AttendanceStudentComponent {
    student: Student;

    constructor(private service: AttendanceStudentMainService) {
        this.service.loadList().subscribe(dto => {
            this.student = new Student({});
            this.student.rollcalls = dto.rollcalls.map((a: any) => new RollcallDetail(a));
            this.student.leaves = dto.studentLeaves.map((a: any) => new StudentLeaveDetail(a));
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
