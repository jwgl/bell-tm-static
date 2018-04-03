import {Component} from '@angular/core';

import {CommonDialog} from 'core/common-dialogs';
import {Dialog} from 'core/dialogs';

import {DeptAdminForm} from '../../shared/form.model';

import {DeptAdminDialog} from '../editor/form-editor.component';
import {DeptAdminFormService} from '../form.service';

@Component({
    selector: 'deptAdmin-list',
    templateUrl: 'form-list.component.html',
})
export class DeptAdminListComponent {
    deptAdmins: DeptAdminForm[];

    constructor(
        private service: DeptAdminFormService,
        private dialog: Dialog,
        private dialogs: CommonDialog,
    ) {
        this.loadData();
    }

    loadData() {
        this.service.loadList().subscribe((dto: any[]) => this.deptAdmins = dto.map(it => new DeptAdminForm(it)));
    }

    open() {
        this.dialog.open(DeptAdminDialog).then(form => {
            this.service.create(form).subscribe(id => {
                this.loadData();
            });
        });
    }

    remove(item: DeptAdminForm) {
        this.dialogs.confirm('警告', `确定要删除 ${item.departmentName} 的 ${item.teacherName} ？`).then(() => {
            this.service.delete(item.id).subscribe(() => {
                this.loadData();
            });
        });
    }
}
