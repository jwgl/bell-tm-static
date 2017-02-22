import {Component, ElementRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as _ from 'lodash';

import {ReviewOptions} from 'core/workflow';

import {Schedule, ScheduleDto} from '../../../shared/schedule/schedule.model';
import {FreeListenForm} from '../../shared/form.model';
import {FreeListenApprovalService} from '../approval.service';

import '../../shared/form-viewer.model';

/**
 * 审批补办学生证申请项。
 */
@Component({
    templateUrl: 'approval-item.component.html',

})
export class FreeListenApprovalItemComponent {
    schedules: Schedule[];
    form: FreeListenForm;

    private id: string;
    private wi: string;

    constructor(
        private route: ActivatedRoute,
        private service: FreeListenApprovalService,
    ) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.wi = params['wi'];
            this.service.loadItem(this.id, this.wi).subscribe(dto => this.onItemLoaded(dto));
        });
    }

    onItemLoaded(dto: any) {
        const studentSchedules: Schedule[] = dto.studentSchedules.map((s: ScheduleDto) => new Schedule(s));
        const departmentSchedules: Schedule[] = dto.departmentSchedules.map((s: ScheduleDto) => new Schedule(s));

        this.form = new FreeListenForm(dto.form, studentSchedules);
        if (this.wi === undefined) {
            this.wi = dto.form.workitemId;
        }

        studentSchedules.forEach(it => it.belongsTo = 'student');
        departmentSchedules.forEach(it => it.belongsTo = 'department');
        this.schedules = _.concat(studentSchedules, departmentSchedules);
    }

    get reviewable(): boolean {
        return this.wi && this.form.status === 'CHECKED';
    }

    get reviewOptions(): ReviewOptions {
        return {
            id: this.id,
            wi: this.wi,
            type: 'approve',
            what: this.form.title,
        };
    }
}
