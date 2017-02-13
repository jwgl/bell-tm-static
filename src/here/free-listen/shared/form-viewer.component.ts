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
            case 'checker':
                return ['bg-danger', 'text-white'];
            case 'department':
                return ['bg-warning', 'text-white'];
            case 'student':
                return this.form.scheduleSelected(schedule)
                     ? ['bg-success', 'text-white']
                     : [];
        }
    }
}
