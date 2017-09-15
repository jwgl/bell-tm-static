import {Component, Input} from '@angular/core';

import {TimeslotItem, Timetable} from 'core/models';
import {FreeListenForm, FreeListenSettings} from './form.model';

@Component({
    selector: 'free-listen-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FreeFormViewerComponent {
    @Input() form: FreeListenForm;
    @Input() timetable: Timetable;
    @Input() settings: FreeListenSettings;

    mouseover(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.filter(it => it.schedules.some(schedule => {
                return item.schedules.some(s => s.courseClassId === schedule.courseClassId);
            })).forEach(it => it.highlight = true);
        });
    }

    mouseout(item: TimeslotItem) {
        this.timetable.getTimeslots(0).forEach(timeslot => {
            timeslot.items.forEach(it => it.highlight = false);
        });
    }
}
