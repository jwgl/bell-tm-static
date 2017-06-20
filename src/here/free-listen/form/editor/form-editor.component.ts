import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {Schedule, ScheduleDto, Term} from '../../../shared/schedule/schedule.model';
import {FreeListenForm, FreeListenItem} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';
import './form-editor.model';

interface Teacher {
    id: string;
    name: string;
}

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class FreeFormEditorComponent {
    private editMode: EditMode;
    private form: FreeListenForm;
    private saving = false;
    private schedules: Schedule[];
    private term: Term;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: FreeListenFormService,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        const params = this.route.snapshot.params;
        switch (this.editMode) {
            case EditMode.Create:
                this.service.loadDataForCreate().subscribe(dto => this.onLoadData(dto));
                break;
            case EditMode.Edit:
                this.service.loadItemForEdit(params['id']).subscribe(dto => this.onLoadData(dto));
                break;
        }
    }

    onLoadData(dto: any) {
        this.schedules = dto.schedules.map((scheduleDto: ScheduleDto) => {
            const schedule: Schedule = new Schedule(scheduleDto);
            schedule.courseTeacherId = dto.courseTeacherId;
            schedule.courseTeacherName = dto.courseTeacherName;
            schedule.repeatType = scheduleDto.repeatType;
            return schedule;
        });
        this.form = new FreeListenForm(dto.form, this.schedules);
        this.form.removedItems = [];
        this.term = dto.term;
    }

    cancel() {
        switch (this.editMode) {
            case EditMode.Create:
                this.router.navigate(['/']);
                break;
            case EditMode.Edit:
                this.router.navigate(['/', this.form.id]);
                break;
        }
    }

    save() {
        switch (this.editMode) {
            case EditMode.Create:
                this.create();
                break;
            case EditMode.Edit:
                this.update();
                break;
        }
    }

    create() {
        this.saving = true;
        this.service.create(this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    update() {
        this.saving = true;
        this.service.update(this.form.id, this.form.toServerDto()).subscribe(id => {
            this.router.navigate(['/', id]);
        }, error => {
            this.saving = false;
            alert(error.json().message);
        });
    }

    scheduleClass(schedule: Schedule) {
        return this.form.scheduleSelected(schedule)
             ? 'btn-danger'
             : this.form.scheduleApproved(schedule)
             ? 'btn-success'
             : this.form.scheduleExisted(schedule)
             ? 'btn-info'
             : 'btn-secondary';
    }
}
