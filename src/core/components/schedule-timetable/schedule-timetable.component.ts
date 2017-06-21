import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

import {Timetable} from './schedule-timetable.model';

@Component({
    selector: 'schedule-timetable',
    styleUrls: ['schedule-timetable.component.scss'],
    templateUrl: 'schedule-timetable.component.html',
})
export class ScheduleTimetableComponent {
    @Input() timetable: Timetable;

    @ContentChild('timeslotTpl') timeslotTemplate: TemplateRef<any>;
    @ContentChild('dayOfWeekTpl') dayOfWeekTemplate: TemplateRef<any>;
    @ContentChild('weekTpl') weekTemplate: TemplateRef<any>;

    @Input()
    get week(): number {
        return this.timetable ? this.timetable.week : 0;
    }

    set week(value: number) {
        if (this.timetable) {
            this.timetable.week = value;
        }
    }
}
