import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {LeaveForm} from '../../shared/form.model';
import {LeaveFormService} from '../form.service';
import './form-item.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class LeaveFormItemComponent {
    form: LeaveForm;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: LeaveFormService) {
        this.route.params.subscribe(params => {
            this.loadData(parseInt(params['id'], 10));
        });
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            const schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
            this.form = new LeaveForm(dto.form, schedules);
            this.form.editable = dto.form.editable;
        });
    }

    edit() {
        this.router.navigate(['/', this.form.id, 'edit']);
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.form.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    finish() {
        this.service.finish(this.form.id).subscribe(() => {
            this.loadData(this.form.id);
        }, (error) => {
            alert(error.json().message);
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.form.id,
            type: 'approve',
            what: this.form.title,
        };
    }
}
