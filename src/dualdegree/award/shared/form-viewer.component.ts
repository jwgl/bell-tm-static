import { Component, Input } from '@angular/core';

import * as moment from 'moment';

@Component({
    selector: 'award-form-viewer',
    styleUrls: ['form-viewer.component.scss'],
    templateUrl: 'form-viewer.component.html',
})
export class AwardFormViewerComponent {
    @Input() vm: any;

    expireClass(date: string): string {
        return moment().isAfter(date) ? 'badge badge-danger' : 'badge';
    }
}
