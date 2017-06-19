import {Component, OnInit} from '@angular/core';

import {Schedule, ScheduleDto, Timetable} from 'core/models';

import {StudentTimetableService} from './main.service';

@Component({
    selector: 'student-timetable',
    styleUrls: ['student-timetable.component.scss'],
    templateUrl: 'student-timetable.component.html',
})
export class StudentTimetableComponent implements OnInit {
    timetable: Timetable;
    constructor(private service: StudentTimetableService) {}

    ngOnInit(): void {
        this.service.loadList().subscribe(dto => {
            const term = dto.term;
            const schedules = dto.schedules.map((it: ScheduleDto) => new Schedule(it));
            this.timetable = new Timetable(schedules, term, true);
        });
    }
}
