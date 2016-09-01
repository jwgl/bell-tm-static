import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ReissueFormService} from '../form.service';

/**
 * 所有者培养方案列表。
 */
@Component({
    selector: 'reissue-form-list',
    styles: [require('./form-list.scss')],
    template: require('./form-list.html'),
})
export class ReissueFormListComponent {
    private forms: any[];
    private student: any;

    constructor(
        private formServce: ReissueFormService,
        private router: Router) {
        this.formServce.loadList().subscribe(data => {
            this.student = data.student;
            this.forms = data.forms;
        });
    }

    create() {
        this.router.navigate(['/', 'create']);
    }

    canApply() {
        return this.student.atSchool
            && this.student.picture
            && this.forms.length < 2
            && (this.forms.length === 0 || this.forms.every(item => item.status === 'FINISHED'));
    }
}
