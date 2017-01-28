import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Workflow} from 'core/workflow';

import {LeaveFormService} from '../form.service';
import {LeaveForm} from '../../shared/form.model';
import './form-item.model';
import {Schedule, ScheduleDto, Term} from '../../../shared/schedule/schedule.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class LeaveFormItemComponent {
    form: LeaveForm;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private workflow: Workflow,
        private dialog: CommonDialog,
        private service: LeaveFormService) {
        this.route.params.subscribe(params => {
            this.loadData(parseInt(params['id'], 10));
        });
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            let schedules = dto.schedules.map((s: ScheduleDto) => new Schedule(s));
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

    submit() {
        this.workflow.submit(this.form.id, this.form.title).then(() => {
            this.loadData(this.form.id);
        }, (error) => {
            alert(error.json().message);
        });
    }

    returnList() {
        this.router.navigate(['/']);
    }

    showWorkitems() {
        this.workflow.workitems(this.form.workflowInstanceId);
    }
}
