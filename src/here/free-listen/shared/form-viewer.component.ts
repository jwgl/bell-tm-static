import {Component, Input} from '@angular/core';

import {FreeForm} from './form.model';
import {Schedule, ScheduleDto} from '../../shared/schedule/schedule.model';
import './form-viewer.model';

@Component({
    selector: 'free-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class FreeFormViewerComponent {
    @Input() form: FreeForm;
    @Input() schedules: any;

    getScheduleClass(schedule: Schedule) {
        switch (schedule.belongsTo) {
            case 'checker':
                return 'btn-danger';
            case 'department':
                return 'btn-warning';
            case 'student':
                return this.form.scheduleSelected(schedule) ? 'btn-success' : 'btn-secondary';
        }
    }
}
