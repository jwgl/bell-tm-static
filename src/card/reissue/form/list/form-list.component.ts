import {Component} from '@angular/core';

import {ReissueFormService} from '../form.service';

@Component({
    styleUrls: ['form-list.component.scss'],
    templateUrl: 'form-list.component.html',
})
export class ReissueFormListComponent {
    forms: any[];
    warning: string = null;

    constructor(private service: ReissueFormService) {
        this.service.loadList().subscribe(data => {
            this.warning = data.warning || null;
            this.forms = data.forms;
        });
    }

    canApply() {
        return !this.warning
            && this.forms.length < 2
            && (this.forms.length === 0
            || this.forms.every(item => item.status === 'FINISHED'));
    }
}
