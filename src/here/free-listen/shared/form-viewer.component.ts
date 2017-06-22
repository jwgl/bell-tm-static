import {Component, Input} from '@angular/core';

import {TimeslotItem, Timetable} from 'core/models';
import {FreeListenForm} from './form.model';

@Component({
    selector: 'free-listen-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FreeFormViewerComponent {
    @Input() form: FreeListenForm;
    @Input() timetable: Timetable;

    getTimeslotItemClass(item: TimeslotItem) {
        const schedule = item.getFreeListenSchedule();
        switch (schedule.owner) {
            case 'department':
                return ['bg-warning', 'text-white'];
            case 'self':
                return this.form.scheduleSelected(schedule)
                     ? ['bg-danger', 'text-white']
                     : this.form.scheduleApproved(schedule)
                     ? ['bg-success', 'text-white']
                     : this.form.scheduleExisted(schedule)
                     ? ['bg-info', 'text-white']
                     : [];
        }
    }
}
