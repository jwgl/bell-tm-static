import {Component, OnInit} from '@angular/core';

import {Schedule, ScheduleDto, Term, Timetable} from 'core/models';

import {StudentTimetableService} from './main.service';

@Component({
    selector: 'student-timetable',
    styleUrls: ['student-timetable.component.scss'],
    templateUrl: 'student-timetable.component.html',
})
export class StudentTimetableComponent implements OnInit {
    term: Term;
    timetable: Timetable;

    constructor(private service: StudentTimetableService) {}

    ngOnInit(): void {
        this.service.loadList().subscribe(dto => {
            this.term = dto.term;
            this.timetable = new Timetable(dto.schedules.map((it: ScheduleDto) => new Schedule(it)), true);
        });
    }
}
