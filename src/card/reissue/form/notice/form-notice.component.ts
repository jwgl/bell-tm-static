import {Component} from '@angular/core';

import {ReissueFormService} from '../form.service';

@Component({
    templateUrl: 'form-notice.component.html',
})
export class ReissueFormNoticeComponent {
    notice: {
        title: string,
        content: string,
    };
    constructor(private service: ReissueFormService) {
        this.service.getNotice().subscribe(dto => this.notice = dto);
    }
}
