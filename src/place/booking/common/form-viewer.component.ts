import {Component, Input} from '@angular/core';

@Component({
    selector: 'booking-form-viewer',
    styles: [require('./form-viewer.component.scss')],
    template: require('./form-viewer.component.html'),
})
export class BookingFormViewerComponent {
    @Input() form: any;
}
