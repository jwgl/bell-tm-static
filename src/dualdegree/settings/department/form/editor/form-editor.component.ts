import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';

import {DeptAdminForm} from '../../shared/form.model';
import {DeptAdminFormService} from '../form.service';
import './form-editor.model';

@Component({
    selector: 'deptAdmin-dialog',
    templateUrl: 'form-editor.component.html',
})
export class DeptAdminDialog extends BaseDialog {
    departments: any[];
    form: DeptAdminForm;
    teacher: any;

    constructor(private service: DeptAdminFormService) {
        super();
        this.form = new DeptAdminForm([]);
    }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    protected onOpening(): Observable<any> {
        this.service.loadDataForCreate().subscribe(dto => {
            this.departments = dto.departments;
        });
        return null;
    }

    protected onConfirmed(): any {
        this.form.teacherId = this.teacher.id;
        return this.form.toServerDto();
    }

}
