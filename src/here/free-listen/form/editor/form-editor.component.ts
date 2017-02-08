import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {FreeFormService} from '../form.service';
import {FreeForm, FreeItem} from '../../shared/form.model';
import './form-editor.model';
import {Schedule, ScheduleDto, Term} from '../../../shared/schedule/schedule.model';
import '../../shared/student-schedule.model';

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
    private form: FreeForm;
    private saving = false;
    private schedules: Schedule[];
    private term: Term;
    private selectedTeacher: Teacher;
    private teachers: Teacher[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: FreeFormService,
    ) {
        this.editMode = this.route.snapshot.data['mode'];
        let params = this.route.snapshot.params;
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
            let schedule: Schedule = new Schedule(scheduleDto);
            schedule.repeatType = (<any>scheduleDto).repeatType;
            return schedule;
        });
        this.form = new FreeForm(dto.form, this.schedules);
        this.form.removedItems = [];
        this.form.existedItems = dto.existedItems.map((item: any) => {
            let freeItem = new FreeItem(this.form, item);
            freeItem.schedule = this.schedules.find(s => s.id === item.taskScheduleId);
            return freeItem;
        });
        this.term = dto.term;

        this.teachers = _.chain(this.schedules)
                         .map(it => ({id: it.courseTeacherId, name: it.courseTeacherName}))
                         .uniqBy(it => it.id)
                         .sort((a, b) => a.name.localeCompare(b.name))
                         .value();

        if (this.form.checkerId) {
            this.selectedTeacher = this.teachers.find(it => it.id === this.form.checkerId);
        } else {
            this.selectedTeacher = this.teachers[0];
        }
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
}
