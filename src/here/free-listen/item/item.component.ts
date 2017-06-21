import {Component, ElementRef} from '@angular/core';

import {Schedule, ScheduleDto, Timetable} from 'core/models';

import {FreeListenForm} from '../shared/form.model';
import {FreeListenItemService} from './item.service';

@Component({
    selector: 'free-listen-item',
    templateUrl: 'item.component.html',
})
export class FreeListenItemComponent {
    form: FreeListenForm;
    timetable: Timetable;

    constructor(elementRef: ElementRef, private service: FreeListenItemService) {
        this.loadItem(parseInt(elementRef.nativeElement.getAttribute('id'), 10));
    }

    loadItem(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
            this.form = new FreeListenForm(dto.form, studentSchedules);
            this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
        }, (error) => {
            if (error.status === 403) {
                alert('无权查看');
            }
        });
    }
}
