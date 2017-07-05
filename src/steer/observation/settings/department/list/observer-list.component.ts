import { Component } from '@angular/core';

import { CommonDialog } from 'core/common-dialogs';
import { Dialog } from 'core/dialogs';

import { ObserverEditorComponent } from '../editor/observer-editor.component';
import { ObserverService } from '../observer.service';

@Component({
    selector: 'observer-list',
    styleUrls: ['observer-list.component.scss'],
    templateUrl: 'observer-list.component.html',
})
export class ObserverListComponent {
    observerFilter: any = {};
    supervisors: any[] = [];
    terms: any[] = [];

    constructor(
        private commonDialog: CommonDialog,
        private dialog: Dialog,
        private service: ObserverService) {
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
    }

    set termId(value: number) {
        this.observerFilter.termId = value;
        this.findSupervisor();
    }

    get termId(): number {
        return this.observerFilter.termId;
    }

    valueFn = (item: any) => item.id;
    labelFn = (item: any) => item.name;
    onTeacherSelected(teacher: any): void {
        this.observerFilter.teacher = teacher;
    }

    onLoadData(dto: any) {
        this.observerFilter.termId = dto.activeTerm;
        this.terms = dto.terms;
        this.findSupervisor();
    }

    findSupervisor(): void {
        this.service.loadList().subscribe(result => this.loadList(result));
    }

    loadList(dto: any[]) {
        this.supervisors = dto
            .filter(s => this.observerFilter.termId ? s.termId === this.observerFilter.termId : true);
    }

    create() {
        const title = `添加 ${this.termText} 院督导`;
        this.dialog.open(ObserverEditorComponent, { title }).then(result => {
            if (result) {
                this.service.create({ userId: result.userId, termId: this.observerFilter.termId }).subscribe(id => {
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
