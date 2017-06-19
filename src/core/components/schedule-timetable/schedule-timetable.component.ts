import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

import {Timetable} from './schedule-timetable.model';

@Component({
    selector: 'schedule-timetable',
    styleUrls: ['schedule-timetable.component.scss'],
    templateUrl: 'schedule-timetable.component.html',
})
export class ScheduleTimetableComponent {
    @Input() timetable: Timetable;
    @Input() size: string;
    @Input() tabEnabled: boolean;

    @ContentChild('timeslotTpl') timeslotTemplate: TemplateRef<any>;
    @ContentChild('dayOfWeekTpl') dayOfWeekTemplate: TemplateRef<any>;
    @ContentChild('weekTpl') weekTemplate: TemplateRef<any>;
    @ContentChild('weekTabTpl') weekTabTemplate: TemplateRef<any>;
}
