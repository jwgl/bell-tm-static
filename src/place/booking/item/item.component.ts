import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Workflow} from 'core/workflow';

import {BookingForm} from '../shared/form.model';
import {BookingItemService} from './item.service';

@Component({
    selector: 'booking-item',
    templateUrl: 'item.component.html',
})
export class BookingItemComponent {
    form: BookingForm;
    constructor(
        elementRef: ElementRef,
        private workflow: Workflow,
        private service: BookingItemService,
    ) {
        const id = elementRef.nativeElement.getAttribute('id');
        this.service.loadItem(id).subscribe(dto => {
            this.form = new BookingForm(dto);
        });
    }
}
