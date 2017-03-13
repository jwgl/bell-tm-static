import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ReviewOptions, RevokeOptions} from 'core/workflow';

import {ReissueForm, Student} from '../shared/reissue-form.model';

@Component({
    templateUrl: 'approval-item.component.html',

})
export class ReissueApprovalItemComponent {
    form: ReissueForm;
    student: Student;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.student = dto.student;
        this.form = new ReissueForm(dto.form, this.student);
        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'SUBMITTED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }
}
