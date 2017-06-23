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
}
