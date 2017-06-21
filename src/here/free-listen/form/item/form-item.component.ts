import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CommonDialog} from 'core/common-dialogs';
import {Schedule, ScheduleDto, Timetable} from 'core/models';
import {SubmitOptions} from 'core/workflow';

import {FreeListenForm} from '../../shared/form.model';
import {FreeListenFormService} from '../form.service';
import './form-item.model';

@Component({
    templateUrl: 'form-item.component.html',
})
export class FreeFormItemComponent {
    form: FreeListenForm;
    timetable: Timetable;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private dialog: CommonDialog,
        private service: FreeListenFormService) {
        this.route.params.subscribe(params => this.loadItem(parseInt(params['id'], 10)));
    }

    loadItem(id: number) {
        this.service.loadItem(id).subscribe(dto => {
            const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
            const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s, 'department'));
            this.form = new FreeListenForm(dto.form, studentSchedules);
            this.form.editable = dto.form.editable;
            this.timetable = new Timetable(studentSchedules.concat(departmentSchedules));
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
