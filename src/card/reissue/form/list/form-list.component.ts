import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {ReissueFormService} from '../form.service';

/**
 * 补办学生证申请列表。
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
        private service: ReissueFormService,
        private router: Router) {
        this.service.loadList().subscribe(data => {
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
