import {Component} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {StudentAdminDialog} from '../editor/form-editor.component';
import {StudentAdminFormService} from '../form.service';

import {QueryDialog} from './query-option.dialog';

@Component({
    selector: 'studentAdmin-list',
    templateUrl: 'form-list.component.html',
})
export class StudentAdminListComponent {
    students: any[];
    options: any;

    constructor(
        private service: StudentAdminFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) { }

    open() {
        this.dialog.open(StudentAdminDialog).then(form => {
            this.service.batchSave(null, form).subscribe(dto => {
                if (dto.logs) {
                    this.dialogs.error(dto.logs);
                }
            });
        });
    }

    query() {
        this.dialog.open(QueryDialog).then(form => {
            this.options = form;
            this.loadData();
        });
    }

    remove(item: any) {
        this.dialogs.confirm('警告', `确定要删除 ${item.studentName} (${item.studentId}) ？`).then(() => {
            this.service.delete(item.id).subscribe(() => {
                this.loadData();
            });
        });
    }

    loadData() {
        this.service.loadList(this.options).subscribe((dto: any[]) => this.students = dto);
    }
}
