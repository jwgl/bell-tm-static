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
        switch (item.schedules[0].owner) {
            case 'department':
                return ['bg-warning', 'text-white'];
            case 'self':
                return this.form.scheduleSelected(item.schedules[0])
                     ? ['bg-danger', 'text-white']
                     : this.form.scheduleApproved(item.schedules[0])
                     ? ['bg-success', 'text-white']
                     : this.form.scheduleExisted(item.schedules[0])
                     ? ['bg-info', 'text-white']
                     : [];
        }
    }
}
