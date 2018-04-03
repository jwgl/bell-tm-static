import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Dialog} from 'core/dialogs';
import {Schedule, ScheduleDto} from 'core/models';
import {ApiUrl, Rest} from 'core/rest';
import {ReviewOptions} from 'core/workflow';

import {AwardForm} from '../../shared/form.model';
import {ApplicationForm} from '../shared/form.model';
import {MentorSelectDialog} from './mentor/mentor-select.dialog';

@Component({
    templateUrl: 'approval-item.component.html',
})
export class ApplicationApprovalItemComponent {
    form: ApplicationForm;
    fileNames: any;
    settings: AwardForm;

    private wi: string;
    private prevId: number;
    private nextId: number;

    constructor(route: ActivatedRoute,
                private rest: Rest,
                private api: ApiUrl,
                private dialog: Dialog) {
        route.data.subscribe((data: {item: any}) => this.onItemLoaded(data.item));
    }

    onItemLoaded(dto: any) {
        this.form = new ApplicationForm(dto.form);
        this.settings = new AwardForm(dto.settings);
        this.fileNames = dto.fileNames;

        this.wi = dto.workitemId;
        this.prevId = dto.prevId;
        this.nextId = dto.nextId;
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'STEP1';
    }

    get nextOptions(): ReviewOptions {
        return {
            id: this.form.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }

    get mentorable(): boolean {
        return !this.form.paperApprover && this.form.status === 'STEP3';
    }

    setMentor() {
        this.dialog.open(MentorSelectDialog).then(result => {
            this.rest.put(`${this.api.item(this.form.id)}`, {teacherId: result})
                .subscribe(() => this.form.paperApprover = result);
        });
    }
}
