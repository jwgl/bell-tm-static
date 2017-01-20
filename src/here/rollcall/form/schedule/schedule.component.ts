import {Component, OnInit} from '@angular/core';

import {RollcallFormService} from '../form.service';
import {Term, Schedule} from '../../../shared/schedule/schedule.model';

@Component({
    selector: 'rollcall-schedule',
    styleUrls: ['schedule.component.scss'],
    templateUrl: 'schedule.component.html',
})
export class RollcallScheduleComponent implements OnInit {
    term: Term;
    schedules: Schedule[];

    constructor(
        private service: RollcallFormService,
    ) {}

    ngOnInit() {
        this.term = this.service.term;
        this.schedules = this.service.schedules;
    }
}
