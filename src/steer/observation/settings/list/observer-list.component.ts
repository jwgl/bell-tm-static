import { Component } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';
import { TeacherSelectDialog } from 'core/dialogs/teacher-select.dialog';

import { ObserverTypes } from '../../shared/constant';
import { ObserverService } from '../observer.service';

@Component({
    selector: 'observer-list',
    styleUrls: ['observer-list.component.scss'],
    templateUrl: 'observer-list.component.html',
})
export class ObserverListComponent {
    observerFilter: any = {};
    supervisors: any[] = [];
    departments: any[] = [];
    terms: any[] = [];
    observerTypes: any[] = ObserverTypes;

    constructor(
        private commonDialog: CommonDialog,
        private dialog: Dialog,
        private service: ObserverService) {
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
    }

    valueFn = (item: any) => item.id;
    labelFn = (item: any) => item.name;
    onTeacherSelected(teacher: any): void {
        this.observerFilter.teacher = teacher;
    }

    onLoadData(dto: any) {
        this.departments = dto.departments;
        this.observerFilter.termId = dto.activeTerm;
        this.observerFilter.observerType = 1;
        this.terms = dto.terms;
        this.findSupervisor();
    }

    findSupervisor(): void {
        this.service.loadList().subscribe(result => this.loadList(result));
    }

    loadList(dto: any[]) {
        this.supervisors = dto.filter(s => (this.observerFilter.teacher ? s.tId === this.observerFilter.teacher.id : true) &&
            (this.observerFilter.departmentId ? s.dId === this.observerFilter.departmentId : true) &&
            (this.observerFilter.termId ? s.termId === this.observerFilter.termId : true) &&
            (this.observerFilter.observerType ? s.observerType === this.observerFilter.observerType : true));
    }

    create() {
        const type = ObserverTypes.filter(item => item.id === this.observerFilter.observerType).map(data => data.name);
        const title = `添加 ${this.termText} ${type}`;
        this.dialog.open(TeacherSelectDialog, { title }).then(result => {
            if (result) {
                this.service.create({
                    userId: result.id,
                    termId: this.observerFilter.termId,
                    observerType: this.observerFilter.observerType,
                }).subscribe(id => {
                    this.service.loadList().subscribe(dto => this.loadList(dto));
                });
            }
        });
    }

    remove(id: number): void {
        this.commonDialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(id).subscribe(() => this.findSupervisor());
        });
    }

    get termText(): string {
        const year = Math.floor(this.observerFilter.termId / 10);
        return `${year}-${year + 1}学年 第${this.observerFilter.termId % 10}学期`;
    }
}
