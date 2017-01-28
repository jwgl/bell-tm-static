import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {EditMode} from 'core/constants';

import {LeaveForm, LeaveItem, LeaveTypes} from '../../shared/form.model';
import './form-editor.model';
import {LeaveFormService} from '../form.service';
import {Schedule, ScheduleDto, Term} from '../../../shared/schedule/schedule.model';

@Component({
    styleUrls: ['form-editor.component.scss'],
    templateUrl: 'form-editor.component.html',
})
export class LeaveFormEditorComponent {
    private editMode: EditMode;
    private form: LeaveForm;
    private saving = false;
    private schedules: Schedule[];
    private term: Term;
    private leaveTypes = LeaveTypes;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: LeaveFormService,
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
        this.schedules = dto.schedules.map((scheduleDto: ScheduleDto) => new Schedule(scheduleDto));
        this.form = new LeaveForm(dto.form, this.schedules);
        this.form.removedItems = [];
        this.form.existedItems = dto.existedItems.map((item: any) => {
            let leaveItem = new LeaveItem(this.form, item);
            if (item.taskScheduleId) {
                leaveItem.schedule = this.schedules.find(s => s.id === item.taskScheduleId);
            }
            return leaveItem;
        });
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
}
