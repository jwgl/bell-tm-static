import {Component, ViewContainerRef} from '@angular/core';

@Component({
    selector: 'booking-form-container',
    template: '<router-outlet></router-outlet>',
})
export class BookingFormComponent {
    constructor(public viewContainerRef: ViewContainerRef) {}
}
