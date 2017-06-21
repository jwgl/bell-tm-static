import {Component, OnInit} from '@angular/core';

import {Term, Timetable} from 'core/models';

import {RollcallFormService} from '../form.service';

@Component({
    selector: 'rollcall-schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html',
})
export class RollcallScheduleComponent {
    constructor(private service: RollcallFormService) {}

    get term(): Term {
        return this.service.term;
    }

    get timetable(): Timetable {
        return this.service.timetable;
    }
}
