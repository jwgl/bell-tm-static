import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseDialog } from 'core/dialogs';

import { ObserverService } from '../observer.service';

@Component({
    selector: 'observer-editor',
    templateUrl: 'observer-editor.component.html',
})
export class ObserverEditorComponent extends BaseDialog {
    observer: any = {};
    teacher: any = {};
    departments: any[] = [];
    terms: any[] = [];
    roleTypes: any[] = [];

    constructor(private service: ObserverService) {
        super();
    }

    ngAfterViewInit() {
        this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
    }

    valueFn = (item: any) => item.id;

    labelFn = (item: any) => item.name;

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
        this.observer.userId = teacher ? teacher.id : null;
    }

    onLoadData(dto: any) {
        this.departments = dto.departments;
        this.observer.termId = dto.activeTerm;
        this.roleTypes = dto.roles;
        this.observer.roleType = 1;
        this.terms = dto.terms;
    }

    protected onOpening(): Observable<any> {
        return null;
    }

    protected onConfirmed(): any {
        return this.observer;
    }
}
