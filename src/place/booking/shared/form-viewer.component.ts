import {Component, Input} from '@angular/core';

@Component({
    selector: 'booking-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class BookingFormViewerComponent {
    @Input() form: any;
}
