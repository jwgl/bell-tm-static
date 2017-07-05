import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseDialog } from 'core/dialogs';

import { ObserverService } from '../observer.service';

@Component({
    selector: 'observer-editor',
    templateUrl: 'observer-editor.component.html',
})
export class ObserverEditorComponent extends BaseDialog {
    supervisor: any = {};
    teacher: any = {};
    title: string;

    constructor(private service: ObserverService) {
        super();
    }

    onTeacherSelected(teacher: any): void {
        this.teacher = teacher;
        this.supervisor.userId = teacher ? teacher.id : null;
    }

    protected onOpening(): Observable<any> {
        this.title = this.options.title || '选择教师';
        return null;
    }

    protected onConfirmed(): any {
        return this.supervisor;
    }
}
