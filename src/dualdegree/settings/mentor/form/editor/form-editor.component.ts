import {Component} from '@angular/core';

import {Observable} from 'rxjs/Observable';

import {BaseDialog} from 'core/dialogs';

import {MentorForm} from '../../shared/form.model';
import {MentorFormService} from '../form.service';
import './form-editor.model';

@Component({
    selector: 'mentor-dialog',
    templateUrl: 'form-editor.component.html',
})
export class MentorFormDialog extends BaseDialog {
    departments: any[];
    form: MentorForm;
    teacher: any;
    editMode: boolean;

    constructor(private service: MentorFormService) {
        super();
        this.form = new MentorForm([]);
    }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
    }

    protected onOpening(): Observable<any> {
        this.form.email = this.options.email;
        this.editMode = this.options.editMode;
        return null;
    }

    protected onConfirmed(): any {
        if (!this.editMode) {
            this.form.teacherId = this.teacher.id;
        }
        return this.form.toServerDto();
    }

}
