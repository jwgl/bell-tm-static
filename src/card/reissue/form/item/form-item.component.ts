import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions} from 'core/workflow';

import {ReissueForm, Student} from '../../shared/reissue-form.model';
import {ReissueFormService} from '../form.service';

@Component({
    templateUrl: 'form-item.component.html',
})
export class ReissueFormItemComponent {
    form: ReissueForm;
    student: Student;
    editable: boolean;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: ReissueFormService) {
        this.route.params.subscribe(params => {
            this.loadData(params['id']);
        });
    }

    loadData(id: string) {
        this.service.loadItem(id).subscribe(dto => {
            this.student = dto.student;
            this.form = new ReissueForm(dto.form, this.student);
            this.editable = dto.editable;
        });
    }

    edit() {
        this.router.navigate(['/', this.form.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.form.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.form.id,
            type: 'approve',
            what: this.form.title,
        };
    }
}
