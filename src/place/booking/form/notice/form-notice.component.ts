import {Component} from '@angular/core';

import {BookingFormService} from '../form.service';

@Component({
    templateUrl: 'form-notice.component.html',
})
export class BookingFormNoticeComponent {
    notice: {title: string, content: string};
    constructor(private service: BookingFormService) {
        this.service.getNotice().subscribe(dto => this.notice = dto);
    }
}
