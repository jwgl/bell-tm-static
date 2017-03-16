import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as _ from 'lodash';

import {CommonDialog} from 'core/common-dialogs';
import {SubmitOptions} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {FreeListenForm} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';

import '../../shared/form-viewer.model';
import './form-item.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class FreeFormItemComponent {
    schedules: Schedule[];
    form: FreeListenForm;
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: FreeListenFormService) {
        this.route.params.subscribe(params => {
            this.loadData(parseInt(params['id'], 10));
        });
    }

    loadData(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s));

            this.form = new FreeListenForm(dto.form, studentSchedules);
            this.form.editable = dto.form.editable;

            studentSchedules.forEach(it => it.belongsTo = 'student');

            departmentSchedules.forEach(it => it.belongsTo = 'department');
            this.schedules = _.concat(studentSchedules, departmentSchedules);
        });
    }

    remove() {
        this.dialog.confirm('删除', '确定要删除吗？').then(() => {
            this.service.delete(this.form.id).subscribe(() => {
                this.router.navigate(['/']);
            });
        });
    }

    get submitOptions(): SubmitOptions {
        return {
            id: this.form.id,
            type: 'check',
            what: this.form.title,
        };
    }
}
