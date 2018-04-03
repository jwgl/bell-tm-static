import {Component} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {MentorForm} from '../../shared/form.model';

import {MentorFormDialog} from '../editor/form-editor.component';
import {MentorFormService} from '../form.service';

@Component({
    selector: 'deptAdmin-list',
    templateUrl: 'form-list.component.html',
})
export class MentorListComponent {
    mentors: MentorForm[];

    constructor(
        private service: MentorFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any[]) => this.mentors = dto.map(it => new MentorForm(it)));
    }

    open() {
        this.dialog.open(MentorFormDialog).then(form => {
            this.service.save(0, form).subscribe(id => {
                this.loadData();
            });
        });
    }

    remove(item: MentorForm) {
        this.dialogs.confirm('警告', `确定要删除 ${item.teacherName} ？`).then(() => {
            this.service.delete(item.id).subscribe(() => {
                this.loadData();
            });
        });
    }

    edit(item: MentorForm) {
        this.dialog.open(MentorFormDialog, {email: item.email, editMode: true}).then(form => {
            this.service.save(item.id, form).subscribe(() => {
                this.loadData();
            });
        });
    }
}
