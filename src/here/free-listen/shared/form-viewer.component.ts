import {Component, Input} from '@angular/core';

import {Schedule, ScheduleDto} from '../../shared/schedule/schedule.model';
import {FreeListenForm} from './form.model';

import './form-viewer.model';

@Component({
    selector: 'free-listen-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FreeFormViewerComponent {
    @Input() form: FreeListenForm;
    @Input() schedules: any;

    getScheduleClass(schedule: Schedule) {
        switch (schedule.belongsTo) {
            case 'department':
                return ['bg-warning', 'text-white'];
            case 'student':
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
